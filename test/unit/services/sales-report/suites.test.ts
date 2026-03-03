/* eslint-disable max-lines-per-function */
import { describe, it, expect, vi } from 'vitest';

import { SalesReportService, SalesReportServiceImpl } from '@/services/sales-report';
import { SalesReportRepository } from '@/repositories/sales-report';

import { SalesReportRepositoryStub } from '@tests/unit/services/sales-report/stubs';
import { NotFoundError, ServerError } from '@/errors';

type SutTypes = {
    sut: SalesReportService;
    salesReportRepository: SalesReportRepository;
};

const makeSut = (): SutTypes => {
    const salesReportRepository = new SalesReportRepositoryStub();
    return {
        sut: new SalesReportServiceImpl(salesReportRepository),
        salesReportRepository
    };
};

describe('SalesReportService Test Cases', () => {
    it('should throws if SalesReportRepository throws', async () => {
        const { sut, salesReportRepository } = makeSut();
        vi.spyOn(salesReportRepository, 'findByDays').mockRejectedValueOnce(() => {
            throw new ServerError('Fake Error', 'teste stack');
        });
        const result = await sut.findByDays();
        expect(result.isLeft()).toBeTruthy();
        expect(result.value).toBeInstanceOf(ServerError);
    });

    it('should returns a NotFoundError if no records were found for the provided parameters', async () => {
        const { sut, salesReportRepository } = makeSut();
        vi.spyOn(salesReportRepository, 'findByDays').mockReturnValueOnce(Promise.resolve(null));
        const result = await sut.findByDays();
        expect(result.isLeft()).toBeTruthy();
        expect(result.value).toBeInstanceOf(NotFoundError);
        const error = result.value as NotFoundError;
        expect(error.code).toBe(404);
        expect(error.message).toBe('Nenhum dado encontrado para os parâmetros informados.');
    });

    it('should returns SalesReport if everything worked as expected', async () => {
        const { sut } = makeSut();
        const result = await sut.findByDays();
        expect(result.isRight()).toBeTruthy();
        expect(result.value).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    salesOrderTotalAmount: 100,
                    customerFullname: 'Jesse Lingard'
                })
            ])
        );
    });
});
