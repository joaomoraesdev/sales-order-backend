import { customerService } from '../services/customer';
import { CustomerControllerImpl } from '@/controllers/customer/implementation';
import { CustomerController } from '@/controllers/customer/protocols';

const makeCustomerController = (): CustomerController => {
    return new CustomerControllerImpl(customerService);
};

export const customerController = makeCustomerController();
