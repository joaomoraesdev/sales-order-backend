/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */
import { api } from '@tests/e2e/config/api';

describe('== Customers Routes', () => {
    describe('Method: afterRead Customers', () => {
        it('should get all customers with @yahoo', async () => {
            const { data, status } = await api.get('/sales-order/Customers');
            const { value: customers } = data;
            expect(status).toBe(200);
            expect(customers.length).toBe(10);
            expect(customers).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        email: 'email@hotmail.com'
                    })
                ])
            );
        });

        it('should return at least one email with @gmail.com', async () => {
            const { data, status } = await api.get('/sales-order/Customers');
            const { value: customers } = data;
            expect(status).toBe(200);
            expect(customers.length).toBe(10);
            expect(customers).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: '27115067-f71a-4e3d-b58d-b0bd795e84a2',
                        firstName: 'Juliana',
                        lastName: 'Araujo',
                        email: 'email@gmail.com'
                    })
                ])
            );
        });
    });
});
