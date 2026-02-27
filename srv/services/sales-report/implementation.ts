import { ExpectedResult as SalesReportByDays } from '@models/db/types/SalesReportByDays';
import { SalesReportService } from './protocols';
import { SalesReportRepository } from 'srv/repositories/sales-report/protocols';

export class SalesReportServiceImpl implements SalesReportService {
    constructor(private readonly repository: SalesReportRepository) {}

    public async findByDays(days: number): Promise<SalesReportByDays[]> {
        const reportData = await this.repository.findByDays(days);
        if (!reportData) return [];

        return reportData.map((r) => r.toObject());
    }

    public async findByCustomerId(customerId: string): Promise<SalesReportByDays[]> {
        const reportData = await this.repository.findByCustomerId(customerId);
        if (!reportData) return [];

        return reportData.map((r) => r.toObject());
    }
}
