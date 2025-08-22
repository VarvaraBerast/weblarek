import { IProduct } from "../../../types/index";
export class Cart {
  constructor(cart: IProduct[] = []) {
    this.cart = cart;
  }
  private cart: IProduct[];

  public getProductsInCart(): IProduct[] {
    return this.cart;
  }
  public addProductToCart(product: IProduct): void {
    this.cart.push(product);
  }

  public removeProductFromCart(id: string): void {
    const index = this.cart.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
  }

  public clearCart(): void {
    this.cart = [];
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
