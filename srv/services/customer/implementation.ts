import { left, right, Either } from '@sweet-monads/either';
import { CustomerService } from './protocols';
import { Customers } from '@models/sales';
import { AbstractError, ServerError } from 'srv/errors/index';
import { CustomerModel } from 'srv/models/customer';

export class CustomerServiceImpl implements CustomerService {
    public afterRead(customerList: Customers): Either<AbstractError, Customers> {
        try {
            const customers = customerList.map((c) => {
                const customer = CustomerModel.with({
                    id: c.id as string,
                    firstName: c.firstName as string,
                    lastName: c.lastName as string,
                    email: c.email as string
                });
                customer.setDefaultEmailDomain();
                return customer.setDefaultEmailDomain().toObject();
            });
            return right(customers);
        } catch (error) {
            const errorInstance: Error = error as Error;
            return left(new ServerError(errorInstance.message, errorInstance.stack as string));
        }
    }
}
