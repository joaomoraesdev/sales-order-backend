import '../configs/module-alias';

import { salesOrderHeaderController } from '../factories/controllers/sales-order-header';

import { Request, Service } from '@sap/cds';
import { Customers, SalesOrderHeaders } from '@models/sales';

import { SalesReportRepositoryImpl } from 'srv/repositories/sales-report/implementation';

/* eslint-disable max-lines-per-function */
export default (service: Service) => {
    // Authentications
    service.before('READ', '*', (request: Request) => {
        if (!request.user.is('read_only_user')) return request.reject(403, 'Não autorizada a leitura');
    });

    service.before(['WRITE', 'DELETE'], '*', (request: Request) => {
        if (!request.user.is('admin')) return request.reject(403, 'Não autorizada a escrita/deleção');
    });

    // Event Handlers

    service.after('READ', 'Customers', (customersList: Customers) => {
        // request is implicitly handled by the CAP framework
        return customersList;
    });

    service.before('CREATE', 'SalesOrderHeaders', async (request: Request) => {
        const result = await salesOrderHeaderController.beforeCreate(request.data);
        if (result.hasError) return request.reject(400, result.error?.message as string);

        request.data.totalAmount = result.totalAmount;
    });

    service.after('CREATE', 'SalesOrderHeaders', async (salesOrderHeaders: SalesOrderHeaders, request: Request) => {
        await salesOrderHeaderController.afterCreate(salesOrderHeaders, request.user);
    });

    service.on('getSaleReportByDays', async () => {
        const repository = new SalesReportRepositoryImpl();
        const result = await repository.findByDays(1);
        console.log(result);

        return [
            {
                salesOrderId: '78904813-ef9c-4240-8b88-be2c1c3a3cc9',
                salesOrderAmount: 10,
                customerId: '30800373-c03b-44a3-b96f-478868aebc5d',
                customerFullname: 'Han Solo'
            }
        ];
    });
};
