import { SalesReportController } from 'srv/controllers/sales-report/protocols';
import { SalesReportControllerImpl } from 'srv/controllers/sales-report/implementation';
import { salesReportService } from '../services/sales-report';

const makeSalesReportController = (): SalesReportController => {
    return new SalesReportControllerImpl(salesReportService);
};

export const salesReportController = makeSalesReportController();
