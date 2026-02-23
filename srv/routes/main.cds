using {sales} from '../../db/schema';
using {db.types.SalesReport} from '../../db/types';

// Pode ser com base nas roles tbm: "admin" ou "read_only_user"
// Entities
@requires: 'authenticated-user'
service MainService {
    entity SalesOrderHeaders  as projection on sales.SalesOrderHeaders;

    entity Customers          as projection on sales.Customers
        actions {
            function getSaleReportByCustomerId() returns array of SalesReport.ExpectedResult;
        };

    entity Products           as projection on sales.Products;
    entity SalesOrderLogs     as projection on sales.SalesOrderLogs;
    entity SalesOrderStatuses as projection on sales.SalesOrderStatuses;
}

// Functions
extend service MainService with {
    function getSaleReportByDays(days: SalesReport.Params:days) returns array of SalesReport.ExpectedResult;
}

// Actions
extend service MainService with {

}
