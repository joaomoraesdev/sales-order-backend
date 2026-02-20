import { SalesOrderHeader, SalesOrderHeaders } from '@models/sales';
import { User } from '@sap/cds';

export type CreationPayloadValidationResult = {
    hasError: boolean;
    totalAmount?: number;
    error?: Error;
};

export interface SalesOrderHeaderController {
    beforeCreate(params: SalesOrderHeader): Promise<CreationPayloadValidationResult>;
    afterCreate(params: SalesOrderHeaders, loggedUser: User): Promise<void>;
}
