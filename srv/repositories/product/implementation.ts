/* global SELECT, UPDATE */
import cds from '@sap/cds';

import { ProductModel, ProductProps } from 'srv/models/product';
import { ProductRepository } from './protocols';
import { Products } from '@models/sales';

export class ProductRepositoryImpl implements ProductRepository {
    public async findByIds(ids: ProductProps['id'][]): Promise<ProductModel[] | null> {
        const productQuery = SELECT.from('sales.Products').where({ id: ids });
        const products: Products = await cds.run(productQuery);

        if (products.length === 0) return null;

        return products.map((p) =>
            ProductModel.with({
                id: p.id as string,
                name: p.name as string,
                price: p.price as number,
                stock: p.stock as number
            })
        );
    }

    public async updateStock(product: ProductModel): Promise<void> {
        await UPDATE('sales.Products').where({ id: product.id }).with({ stock: product.stock });
    }
}
