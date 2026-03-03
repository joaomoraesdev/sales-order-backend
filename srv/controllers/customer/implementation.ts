import { CustomerController } from './protocols';
import { CustomerService } from 'srv/services/customer/protocols';
import { Customers } from '@models/sales';
import { BaseControllerImpl, BaseControllerResponse } from '../base';

export class CustomerControllerImpl extends BaseControllerImpl implements CustomerController {
    constructor(private readonly service: CustomerService) {
        super();
    }

    afterRead(customerList: Customers): BaseControllerResponse {
        const result = this.service.afterRead(customerList);
        if (result.isLeft()) return this.error(result.value.code, result.value.message);
        return this.success(result.value);
    }
}
