import { Customers } from '@models/sales';
import { BaseControllerResponse } from '../base';

export interface CustomerController {
    afterRead(customerList: Customers): BaseControllerResponse;
}
