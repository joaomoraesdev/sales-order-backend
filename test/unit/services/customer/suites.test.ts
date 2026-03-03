/* eslint-disable max-lines-per-function */
import { describe, it, expect } from 'vitest';

import { CustomerService, CustomerServiceImpl } from '@/services/customer';
import { Customers } from '@models/sales';

type SutTypes = {
    sut: CustomerService;
};

const makeSut = (): SutTypes => {
    return {
        sut: new CustomerServiceImpl()
    };
};

const id = crypto.randomUUID();

const getCustomersWithoutEmail = (): Customers => [
    {
        id,
        firstName: 'João',
        lastName: 'Moraes',
        email: ''
    }
];

const getCustomersWithFullEmail = (): Customers => [
    {
        id,
        firstName: 'Cuka',
        lastName: 'Cardoso',
        email: 'lucasbtp2@gmail.com'
    }
];

const getCustomersWithEmailWithoutAt = (): Customers => [
    {
        id,
        firstName: 'Joaozinho',
        lastName: 'Silva',
        email: 'joaozinhosilva2@gmail.com'
    }
];

describe('CustomerServiceImpl Test Cases', () => {
    it('should test if afterRead works even if the customers array is empty', () => {
        const { sut } = makeSut();
        const customers = [];
        const result = sut.afterRead(customers);
        const expectedResult = [];
        expect(result.value).toEqual(expectedResult);
    });

    it('should test if afterRead works even with an undefined or empty email', () => {
        const { sut } = makeSut();
        const customers = getCustomersWithoutEmail();
        const result = sut.afterRead(customers);
        const expectedResult: Customers = [{ id, firstName: 'João', lastName: 'Moraes', email: '' }];
        expect(result.value).toEqual(expectedResult);
    });

    it('should test if afterRead does not changes the email if a full email is provided', () => {
        const { sut } = makeSut();
        const customers = getCustomersWithFullEmail();
        const result = sut.afterRead(customers);
        const expectedResult: Customers = [
            { id, firstName: 'Cuka', lastName: 'Cardoso', email: 'lucasbtp2@gmail.com' }
        ];
        expect(result.value).toEqual(expectedResult);
    });

    it('should test if afterRead changes the email if an email without at is provided', () => {
        const { sut } = makeSut();
        const customers = getCustomersWithEmailWithoutAt();
        const result = sut.afterRead(customers);
        const expectedResult: Customers = [
            { id, firstName: 'Joaozinho', lastName: 'Silva', email: 'joaozinhosilva2@gmail.com' }
        ];
        expect(result.value).toEqual(expectedResult);
    });
});
