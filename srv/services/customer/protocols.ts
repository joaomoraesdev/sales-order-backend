import { Customers } from '@models/sales';
import { Either } from '@sweet-monads/either';
import { AbstractError } from 'srv/errors/index';

export interface CustomerService {
    afterRead(customerList: Customers): Either<AbstractError, Customers>;
}
