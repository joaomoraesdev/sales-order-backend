import { ProductModel } from "./product";

type SalesOrderItemsProps = {
    id: string;
    productId: string;
    quantity: number;
    price: number;
    products: ProductModel[];
}

type SalesOrderItemsWithoutId = Omit<SalesOrderItemsProps, 'id'>;

type CreationPayload = {
    product_id: SalesOrderItemsProps['productId'];
}

type CreationPayloadValidationResult = {
    hasError: boolean;
    error?: Error;
}

export class SalesOrderItemModel {
    constructor(private props: SalesOrderItemsProps) { }

    public static create(props: SalesOrderItemsWithoutId): SalesOrderItemModel {
        return new SalesOrderItemModel({
            ...props,
            id: crypto.randomUUID()
        });
    }

    public get id() {
        return this.props.id;
    }

    public get productId() {
        return this.props.productId;
    }

    public get quantity() {
        return this.props.quantity;
    }

    public get price() {
        return this.props.price;
    }

    public get products() {
        return this.props.products;
    }

    public validateCreationPayload(params: CreationPayload): CreationPayloadValidationResult {
        // const dbProduct = products.find(product => product.id === item.product_id);
        // if (!dbProduct)
        //     return request.reject(404, `Produto: ${item.product_id} | Status: Não encontrado`);
        // if (products.some((product) => product.stock === 0))
        //     return request.reject(400, `Produto: ${dbProduct.name} - ${dbProduct.id} | Status: sem estoque disponível`);

        const product = this.products.find(product => product.id === params.product_id);
        if (!product)
            return {
                hasError: true,
                error: new Error(`Produto: ${params.product_id} | Status: Não encontrado`)
            }
        if (product.stock === 0)
            return {
                hasError: true,
                error: new Error(`Produto: ${product.name} - ${product.id} | Status: sem estoque disponível`)
            }
        return {
            hasError: false
        }
    }
}