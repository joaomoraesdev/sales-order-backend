import { ExpectedResult as SalesReportByDays } from '@models/db/types/SalesReportByDays';
import { SalesReportService } from './protocols';
import { SalesReportRepository } from 'srv/repositories/sales-report/protocols';
import { Either, left, right } from '@sweet-monads/either';
import { AbstractError, NotFoundError, ServerError } from '@/errors';

export class SalesReportServiceImpl implements SalesReportService {
    constructor(private readonly repository: SalesReportRepository) {}

    public async findByDays(days: number): Promise<Either<AbstractError, SalesReportByDays[]>> {
        try {
            const reportData = await this.repository.findByDays(days);
            if (!reportData) {
                const stack = new Error().stack as string;
                return left(new NotFoundError('Nenhum dado encontrado para os parâmetros informados.', stack));
            }

            const mappedData = reportData.map((r) => r.toObject());
            return right(mappedData);
        } catch (error) {
            const errorInstance = error as Error;
            return left(new ServerError(errorInstance.message, errorInstance.stack as string));
        }
    }

    public async findByCustomerId(customerId: string): Promise<Either<AbstractError, SalesReportByDays[]>> {
        try {
            const reportData = await this.repository.findByCustomerId(customerId);
            if (!reportData) {
                const stack = new Error().stack as string;
                return left(new NotFoundError('Nenhum dado encontrado para os parâmetros informados.', stack));
            }
            const mappedData = reportData.map((r) => r.toObject());
            return right(mappedData);
        } catch (error) {
            const errorInstance = error as Error;
            return left(new ServerError(errorInstance.message, errorInstance.stack as string));
        }
    }
}
