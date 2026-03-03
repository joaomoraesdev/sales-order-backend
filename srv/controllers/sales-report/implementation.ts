import { SalesReportController } from './protocols';
import { SalesReportService } from 'srv/services/sales-report/protocols';
import { BaseControllerImpl, BaseControllerResponse } from '../base';

export class SalesReportControllerImpl extends BaseControllerImpl implements SalesReportController {
    constructor(private readonly service: SalesReportService) {
        super();
    }

    public async findByDays(days: number): Promise<BaseControllerResponse> {
        const result = await this.service.findByDays(days);
        if (result.isLeft()) return this.error(result.value.code, result.value.message);
        return this.success(result.value);
    }

    public async findByCustomerId(customerId: string): Promise<BaseControllerResponse> {
        const result = await this.service.findByCustomerId(customerId);
        if (result.isLeft()) return this.error(result.value.code, result.value.message);
        return this.success(result.value);
    }
}
