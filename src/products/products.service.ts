import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  insertProduct(title: string, description: string, price: number) {
    const prodId = new Date().toString();
    const newProduct = new Product(prodId, title, description, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }

  getSignleProduct(productId: string) {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }

  // eslint-disable-next-line prettier/prettier
  updateProducts( productId: string, title: string,description: string,price: number) {
    const [product, index] = this.findProduct(productId);
    const updateProduct = { ...product };

    if (title) {
      updateProduct.title = title;
    }
    if (description) {
      updateProduct.desc = description;
    }
    if (price) {
      updateProduct.price = price;
    }
    this.products[index] = updateProduct;
  }

  deleteProduct(productId: string) {
    const index = this.findProduct(productId)[1];
    this.products.splice(index, 1);
  }

  findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return [product, productIndex];
  }
}
