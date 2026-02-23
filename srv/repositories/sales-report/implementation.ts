import cds from '@sap/cds';

import { ExpectedResult as SalesReportByDays } from '@cds-models/db/types/SalesReportByDays';

import { SalesReportModel } from 'srv/models/sales-report';
import { SalesReportRepository } from './protocols';

export class SalesReportRepositoryImpl implements SalesReportRepository {
    /* eslint-disable-next-line max-lines-per-function */
    public async findByDays(days: number): Promise<SalesReportModel[] | null> {
        const today = new Date().toISOString();
        const subtractedDays = new Date();
        subtractedDays.setDate(subtractedDays.getDate() - days);
        const subtractedDaysISOString = subtractedDays.toISOString();

        const sql = SELECT.from('sales.SalesOrderHeaders')
            .columns(
                'id as salesOrderId',
                'totalAmount as salesOrderTotalAmount',
                'customer.id as customerId',
                `customer.firstName || ' ' || customer.lastName as customerFullname`
            )
            .where({ createdAt: { between: subtractedDaysISOString, and: today } });

        const salesReports = await cds.run(sql);

        if (salesReports.length === 0) return null;
        
        return salesReports.map((salesReport: SalesReportByDays) =>
            SalesReportModel.with({
                salesOrderId: salesReport.salesOrderId as string,
                salesOrderTotalAmount: salesReport.salesOrderTotalAmount as number,
                customerId: salesReport.customerId as string,
                customerFullname: salesReport.customerFullname as string
            })
        );
    }
}
