import { ExpectedResult as SalesReport } from "@models/db/types/SalesReportByDays";
import { SalesReportController } from "./protocols";
import { SalesReportService } from "srv/services/sales-report/protocols";

export class SalesReportControllerImpl implements SalesReportController {
    constructor(private readonly service: SalesReportService) { }

    public async findByDays(days: number): Promise<SalesReport[]> {
        return this.service.findByDays(days);
    }

    public async findByCustomerId(customerId: string): Promise<SalesReport[]> {
        return this.service.findByCustomerId(customerId);
    }
}
