/* eslint-disable no-undef */
import { api } from '@tests/e2e/config/api';

describe('GetSalesReportByDays route', () => {
    it('should return 404 if no records were found', async () => {
        await expect(api.get('/sales-order/getSalesReportByDays')).rejects.toThrow(
            'Nenhum dado encontrado para os parâmetros informados.'
        );
    });

    it('should return 404 if no records were found', async () => {
        const { data, status } = await api.get('/sales-order/getSalesReportByDays(days=14)');
        const { value: report } = data;
        console.log(report);
        expect(status).toBe(200);
        expect(report).toEqual(expect.arrayContaining([expect.objectContaining({})]));
    });
});
