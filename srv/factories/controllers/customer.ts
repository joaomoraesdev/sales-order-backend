import { customerService } from '../services/customer';
import { CustomerControllerImpl } from 'srv/controllers/customer/implementation';
import { CustomerController } from 'srv/controllers/customer/protocols';

const makeCustomerController = (): CustomerController => {
    return new CustomerControllerImpl(customerService);
};

export const customerController = makeCustomerController();
