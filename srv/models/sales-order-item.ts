import { ProductModel } from './product';

type SalesOrderItemsProps = {
    id: string;
    productId: string;
    quantity: number;
    price: number;
    products: ProductModel[];
};

type SalesOrderItemsWithoutId = Omit<SalesOrderItemsProps, 'id'>;

type CreationPayload = {
    product_id: SalesOrderItemsProps['productId'];
};

type CreationPayloadValidationResult = {
    hasError: boolean;
    error?: Error;
};

export class SalesOrderItemModel {
    constructor(private props: SalesOrderItemsProps) {}

    public static create(props: SalesOrderItemsWithoutId): SalesOrderItemModel {
        return new SalesOrderItemModel({
            ...props,
            id: crypto.randomUUID()
        });
    }

    public get id() {
        return this.props.id;
    }

    public get productId() {
        return this.props.productId;
    }

    public get quantity() {
        return this.props.quantity;
    }

    public get price() {
        return this.props.price;
    }

    public get products() {
        return this.props.products;
    }

    public validateCreationPayload(params: CreationPayload): CreationPayloadValidationResult {
        // Example validation checks removed for brevity

        const product = this.products.find((product) => product.id === params.product_id);
        if (!product)
            return {
                hasError: true,
                error: new Error(`Produto: ${params.product_id} | Status: Não encontrado`)
            };
        if (product.stock === 0) {
            const message = 'Produto sem estoque disponível';
            return {
                hasError: true,
                error: new Error(message)
            };
        }
        return {
            hasError: false
        };
    }
}
