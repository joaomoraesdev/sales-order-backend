export type ProductProps = {
    id: string;
    name: string;
    price: number;
    stock: number;
};

export type SellValidationResult = {
    hasError: boolean;
    error?: Error;
}

export class ProductModel {
    constructor(private props: ProductProps) { }

    public static with(props: ProductProps): ProductModel {
        return new ProductModel(props);
    }

    public get id() {
        return this.props.id;
    }

    public get name() {
        return this.props.name;
    }

    public get price() {
        return this.props.price;
    }

    public get stock() {
        return this.props.stock;
    }

    public set stock(value: number) {
        this.props.stock = value;
    }

    public sell(amount: number): SellValidationResult {
        if (this.stock < amount) {
            return {
                hasError: true,
                error: new Error('Quantidade insuficiente de produto no estoque')
            }
        }
        this.stock -= amount;
        return {
            hasError: false,
            error: new Error('Quantidade insuficiente de produto no estoque')
        }
    }
}