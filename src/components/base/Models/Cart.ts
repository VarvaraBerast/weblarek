import { IProduct } from "../../../types/index";
import { EventEmitter } from "../Events";
export class Cart {
  private cart: IProduct[]=[];
  private events: EventEmitter;
  
  constructor(events: EventEmitter) {
    this.events=events;
  }
 
  public getProductsInCart(): IProduct[] {
    return this.cart;
  }
  public addProductToCart(product: IProduct): void {
    this.cart.push(product);
    this.events.emit('cart:changed')
  }

  public removeProductFromCart(id: string): void {
    const index = this.cart.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.cart.splice(index, 1);
      this.events.emit('cart:changed')
    }
  }

  public clearCart(): void {
    this.cart = [];
    this.events.emit('cart:changed')
  }

  public getTotalPrice(): number {
    const sum = this.cart.reduce((acc, product) => {
      return acc + (product.price || 0);
    }, 0);
    return sum;
  }
  public getProductCount(): number {
    return this.cart.length;
  }

  public checkCartById(id: string): boolean {
    return this.cart.some((product) => product.id === id);
  }
}
