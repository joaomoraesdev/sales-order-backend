import { CustomerRepositoryImpl } from 'srv/repositories/customer/implementation';
import { ProductRepositoryImpl } from 'srv/repositories/product/implementation';
import { SalesOrderHeaderRepositoryImpl } from 'srv/repositories/sales-order-header/implementation';
import { SalesOrderLogRepositoryImpl } from 'srv/repositories/sales-order-log/implementation';
import { SalesOrderHeaderServiceImpl } from 'srv/services/sales-order-header/implementation';
import { SalesOrderHeaderService } from 'srv/services/sales-order-header/protocols';

const makeSalesOrderHeaderService = (): SalesOrderHeaderService => {
    const salesOrderHeaderRepository = new SalesOrderHeaderRepositoryImpl()
    const customerRepository = new CustomerRepositoryImpl();
    const productRepository = new ProductRepositoryImpl();
    const salesOrderLogRepository = new SalesOrderLogRepositoryImpl();
    return new SalesOrderHeaderServiceImpl(salesOrderHeaderRepository, customerRepository, productRepository, salesOrderLogRepository);
};

export const salesOrderHeaderService = makeSalesOrderHeaderService();
