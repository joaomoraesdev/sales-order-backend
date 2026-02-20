import cds from '@sap/cds';

import { ExpectedResult as SalesReportByDays } from '@models/db/types/SalesReportByDays';

import { SalesReportModel } from 'srv/models/sales-report';
import { SalesReportRepository } from './protocols';

export class SalesReportRepositoryImpl implements SalesReportRepository {
    /* eslint-disable-next-line max-lines-per-function */
    public async findByDays(days: number): Promise<SalesReportModel[] | null> {
        const today = new Date().toISOString();
        const subtractedDays = new Date();
        subtractedDays.setDate(subtractedDays.getDate() - days);
        const subtractedDaysISOString = subtractedDays.toISOString();

        // eslint-disable-next-line quotes
        const customerFullNameExpr = "customer.firstName || ' ' || customer.lastName as customerFullName";

        const sql = SELECT.from('sales.SalesOrderHeaders')
            .columns(
                'id as salesOrderId',
                'totalAmount as SalesOrderTotalAmount',
                'customer.id as customerId',
                customerFullNameExpr
            )
            .where({ createdAt: { between: subtractedDaysISOString, and: today } });

        const salesReports = await cds.run(sql);

        if (salesReports.length === 0) return null;

        return salesReports.map((salesReport: SalesReportByDays) =>
            SalesReportModel.with({
                salesOrderId: salesReport.salesOrderId as string,
                salesOrderAmount: salesReport.salesOrderAmount as number,
                customerId: salesReport.customerId as string,
                customerFullname: salesReport.customerFullname as string
            })
        );
    }
}
