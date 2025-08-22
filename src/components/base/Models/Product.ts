import { IProduct } from "../../../types/index";
export class Product {
  constructor(products: IProduct[] = []) {
    this.products = products;
    this.previewProduct = null;
  }

  private products: IProduct[];
  private previewProduct: IProduct | null;

  public setProducts(products: IProduct[]): void {
    this.products = products;
  }

  public getProducts(): IProduct[] {
    return this.products;
  }

  public getProductById(id: string): IProduct | undefined {
    for (let product of this.products) {
      if (product.id === id) return product;
    }
    return undefined;
  }

  public setPreviewProduct(product: IProduct | null): void {
    this.previewProduct = product;
  }

  public getPreviewProduct(): IProduct | null {
    return this.previewProduct;
  }
}
