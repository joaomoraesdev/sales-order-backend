import '../configs/module-alias';

import { Request, Service } from '@sap/cds';

import { Customers, SalesOrderHeaders } from '@models/sales';

import { salesOrderHeaderController } from '../factories/controllers/sales-order-header';
import { SalesReportRepositoryImpl } from 'srv/repositories/sales-report/implementation';
import { salesReportController } from '../factories/controllers/sales-report';
import { request } from 'axios';

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

    service.on('getSaleReportByDays', async (request: Request) => {
        const days = request.data?.days || 7;
        return salesReportController.findByDays(days);
    });

    service.on('getSaleReportByCustomerId', async (request: Request) => {
        console.log('teste');
        const [{ id: customerId }] = request.params as unknown as { id: string }[];
        console.log(request.params);
        return salesReportController.findByCustomerId(customerId);
    });
};
