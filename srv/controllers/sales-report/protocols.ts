import { BaseControllerResponse } from '../base';

export interface SalesReportController {
    findByDays(days: number): Promise<BaseControllerResponse>;
    findByCustomerId(customerId: string): Promise<BaseControllerResponse>;
}
