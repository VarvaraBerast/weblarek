import { IProduct } from "../../../types/index";
import { EventEmitter } from "../Events";
export class Product {

  private products: IProduct[]=[];
  private previewProduct: IProduct | null= null;
  private events: EventEmitter;

  constructor(events: EventEmitter){
    this.events=events
  }

  public setProducts(products: IProduct[]): void {
    this.products = products;
    this.events.emit('card:changed');
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
    if(product === null){
     this.events.emit('preview:changed'); 
    } else {
      this.events.emit('preview:changed', product); 
    }
  }

  public getPreviewProduct(): IProduct | null {
    return this.previewProduct;
  }
}
