import { ExpectedResult as SalesReportByDays } from '@models/db/types/SalesReportByDays';
import { SalesReportService } from './protocols';
import { SalesReportRepository } from 'srv/repositories/sales-report/protocols';
import { Either, left, right } from '@sweet-monads/either';
import { AbstractError, NotFoundError, ServerError } from 'srv/errors';

export class SalesReportServiceImpl implements SalesReportService {
    constructor(private readonly repository: SalesReportRepository) {}

    public async findByDays(days: number): Promise<Either<AbstractError, SalesReportByDays[]>> {
        try {
            const reportData = await this.repository.findByDays(days);
            const stack = new Error().stack as string;
            if (!reportData)
                return left(new NotFoundError('Nenhum dado encontrado para os parâmetros informados.', stack));

            const mappedData = reportData.map((r) => r.toObject());
            return right(mappedData);
        } catch (error) {
            const errorInstance = error as Error;
            return left(new ServerError(errorInstance.stack as string, errorInstance.message));
        }
    }

    public async findByCustomerId(customerId: string): Promise<SalesReportByDays[]> {
        const reportData = await this.repository.findByCustomerId(customerId);
        if (!reportData) return [];

        return reportData.map((r) => r.toObject());
    }
}
