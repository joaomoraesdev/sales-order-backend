import { SalesOrderItemModel } from "./sales-order-item";

type SalesOrderHeaderProps = {
    id: string;
    customerId: string;
    items: SalesOrderItemModel[];
    totalAmount: number;
}

type SalesOrderHeaderPropsWithoutIdAndTotalAmount = Omit<SalesOrderHeaderProps, 'id' | 'totalAmount'>;

type CreationPayload = {
    customer_id: SalesOrderHeaderProps['customerId'];
    items?: SalesOrderItemModel[];
}

type CreationPayloadValidationResult = {
    hasError: boolean;
    error?: Error;
}

export class SalesOrderHeaderModel {
    constructor(private props: SalesOrderHeaderProps) { }

    public static create(props: SalesOrderHeaderPropsWithoutIdAndTotalAmount): SalesOrderHeaderModel {
        return new SalesOrderHeaderModel({
            ...props,
            id: crypto.randomUUID(),
            totalAmount: 0
        });
    }

    public static with(props: SalesOrderHeaderProps): SalesOrderHeaderModel {
        return new SalesOrderHeaderModel(props);
    }

    public get id() {
        return this.props.id;
    }

    public get customerId() {
        return this.props.customerId;
    }

    public get totalAmount() {
        return this.props.totalAmount;
    }

    public set totalAmount(value: number) {
        this.totalAmount = value;
    }

    public get items() {
        return this.props.items;
    }
    
    validateCreationPayload(params: CreationPayload): CreationPayloadValidationResult {
        const customerValidationResult = this.validateCustomerOnCreation(params.customer_id);
        if (customerValidationResult.hasError)
            return customerValidationResult;

        const itemsValidationResult = this.validateCustomerOnCreation(params.customer_id);
        if (itemsValidationResult.hasError)
            return itemsValidationResult;

        return { 
            hasError: false
        };
    }

    public calculateTotalAmount(): number {
        let totalAmount = 0;
        this.items.forEach(item => {
            totalAmount += (item.quantity as number) * (item.price as number)
        });
        return totalAmount;
    }

    public calculateDiscount(): number {
        let totalAmount = this.calculateTotalAmount();
        if (totalAmount > 30000) {
            totalAmount -= totalAmount * 0.1
        }
        return totalAmount;
    }

    public getProductsData(): { id: string, quantity: number}[] {
        return this.items.map(item => ({
            id: item.productId,
            quantity: item.quantity
        }));
    }

    public toStringfiedObject(): string {
        return JSON.stringify(this.props);
    }

    private validateCustomerOnCreation(customerId: CreationPayload['customer_id']): CreationPayloadValidationResult {
        if (!customerId) {
            return {
                hasError: true,
                error: new Error('Customer inválido')
            };
        }
        return {
            hasError: false
        };
    }

    private validateItemsOnCreation(items: CreationPayload['items']): CreationPayloadValidationResult {
        if (!items || items?.length === 0) {
            return {
                hasError: true,
                error: new Error('Itens inválidos')
            };
        }

        const itemsError: string[] = [];
        items.forEach(item => {
            const validationResult = item.validateCreationPayload({ product_id: item.productId })
            if (validationResult.hasError) {
                itemsError.push(validationResult.error?.message as string);
            }
        });
        if (itemsError.length > 0) {
            const messages = itemsError.join('\n-');
            return {
                hasError: true,
                error: new Error(messages)
            }
        }

        return {
            hasError: false
        };
    }
}