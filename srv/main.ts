import cds, { Request, Service } from "@sap/cds";
import { Customers, Product, Products, SalesOrderItem, SalesOrderItems, SalesOrderHeaders, Customer } from '@models/sales';
import { customerController } from "./factories/controllers/customer";
import { FullRequestParams } from "./routes/protocols";

export default (service: Service) => {
    // Authentications
    service.before('READ', '*', (request: Request) => {
        if (!request.user.is('read_only_user'))
            return request.reject(403, "Não autorizada a leitura");
    });

    service.before(['WRITE', 'DELETE'], '*', (request: Request) => {
        if (!request.user.is('admin'))
            return request.reject(403, "Não autorizada a escrita/deleção");
    });

    // Event Handlers
    service.after('READ', 'Customers', (customersList: Customers, request) => {
        (request as unknown as FullRequestParams<Customers>).results = customerController.afterRead(customersList);
    });

    service.before('CREATE', 'SalesOrderHeaders', async (request: Request) => {
        const params = request.data;
        const items: SalesOrderItems = params.items;
        if (!params.customer_id) {
            return request.reject(400, 'Customer inválido');
        }
        if (!params.items || params.items?.length === 0) {
            return request.reject(400, 'Itens inválidos');
        }
        const customerQuery = SELECT.one.from('sales.Customers').where({ id: params.customer_id });
        const customer = await cds.run(customerQuery);
        if (!customer) {
            return request.reject(404, 'Customer não encontrado');
        }
        const productsIds = params.items.map((item: SalesOrderItem) => item.product_id);
        const productQuery = SELECT.from('sales.Products').where({ id: productsIds });
        const products: Products = await cds.run(productQuery);

        for (const item of params.items) {
            const dbProduct = products.find(product => product.id === item.product_id);
            if (!dbProduct)
                return request.reject(404, `Produto: ${item.product_id} | Status: Não encontrado`);
            if (products.some((product) => product.stock === 0))
                return request.reject(400, `Produto: ${dbProduct.name} - ${dbProduct.id} | Status: sem estoque disponível`);
        }
        let totalAmount = 0;
        items.forEach(item => {
            totalAmount += (item.quantity as number) * (item.price as number)
        });
        if (totalAmount > 30000) {
            totalAmount -= totalAmount * 0.1
        }
        request.data.totalAmount = totalAmount;
    });

    service.after('CREATE', 'SalesOrderHeaders', async (results: SalesOrderHeaders, request: Request) => {
        const headersArray = Array.isArray(results) ? results : [results] as SalesOrderHeaders;
        for (const header of headersArray) {
            const items = header.items as SalesOrderItems;
            const productsData = items.map(item => ({
                id: item.product_id as string,
                quantity: item.quantity as number
            }));

            const productsIds: string[] = productsData.map(productData => productData.id);
            const productQuery = SELECT.from('sales.Products').where({ id: productsIds });
            const products: Products = await cds.run(productQuery);
            for (const productData of productsData) {
                const foundProduct = products.find(product => product.id === productData.id) as Product;
                foundProduct.stock = (foundProduct.stock as number) - productData.quantity;
                await cds.update('sales.Products').where({ id: foundProduct.id }).with({ stock: foundProduct.stock })
            }

            const headersAsString = JSON.stringify(header);
            const userAsString = JSON.stringify(request.user);

            const log = [{
                header_id: header.id,
                userData: userAsString,
                orderData: headersAsString
            }];
            await cds.create('sales.SalesOrderLogs').entries(log);
        }
    });
}