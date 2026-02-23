import { SalesReportRepositoryImpl } from 'srv/repositories/sales-report/implementation';
import { SalesReportServiceImpl } from 'srv/services/sales-report/implementation';
import { SalesReportService } from 'srv/services/sales-report/protocols';

const makeSalesReportService = (): SalesReportService => {
    const repository = new SalesReportRepositoryImpl();
    return new SalesReportServiceImpl(repository);
};

export const salesReportService = makeSalesReportService();
