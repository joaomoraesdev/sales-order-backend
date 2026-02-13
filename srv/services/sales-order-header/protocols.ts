import { SalesOrderHeader, SalesOrderHeaders } from "@models/sales";
import { User } from "@sap/cds";

export type CreationPayloadValidationResult = {
    hasError: boolean;
    totalAmount?: number;
    error?: Error;
}

export interface SalesOrderHeaderService {
    beforeCreate(params: SalesOrderHeader): Promise<CreationPayloadValidationResult>;
    afterCreate(parms: SalesOrderHeaders, loggedUser: User): Promise<void>;
}