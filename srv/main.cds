using { sales } from '../db/schema';

// Pode ser com base nas roles tbm: "admin" ou "read_only_user"
@requires: 'authenticated-user'
service MainService {
    entity SalesOrderHeaders as projection on sales.SalesOrderHeaders;
    entity Customers as projection on sales.Customers;
    entity Products as projection on sales.Products;
    entity SalesOrderLogs as projection on sales.SalesOrderLogs;
}