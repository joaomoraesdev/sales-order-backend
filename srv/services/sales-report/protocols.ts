import { ExpectedResult as SalesReportByDays } from '@models/db/types/SalesReportByDays';
import { Either } from '@sweet-monads/either';
import { AbstractError } from 'srv/errors';

export interface SalesReportService {
    findByDays(days: number): Promise<Either<AbstractError, SalesReportByDays[]>>;
    findByCustomerId(customerId: string): Promise<Either<AbstractError, SalesReportByDays[]>>;
}
