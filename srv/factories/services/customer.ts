import { CustomerService } from 'srv/services/customer/protocols';
import { CustomerServiceImpl } from '../../services/customer/implementation';

const makeCustomerService = (): CustomerService => {
    return new CustomerServiceImpl();
};

export const customerService = makeCustomerService();
