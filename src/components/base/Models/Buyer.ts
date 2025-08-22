import { IBuyer } from "../../../types/index";
export class Buyer {
  constructor() {
    this.payment = "";
    this.email = "";
    this.phone = "";
    this.address = "";
  }

  private payment: "online" | "cash" | "";
  private email: string;
  private phone: string;
  private address: string;

  public setPayment(payment: "online" | "cash" | ""): void {
    this.payment = payment;
  }
  public setEmail(email: string): void {
    this.email = email;
  }
  public setPhone(phone: string): void {
    this.phone = phone;
  }
  public setAddress(address: string): void {
    this.address = address;
  }
  public getData(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address,
    };
  }

  public clearData(): void {
    this.payment = "";
    this.email = "";
    this.phone = "";
    this.address = "";
  }
  public checkData(): boolean {
    const emailCheck = this.email.includes("@") && this.email.includes(".");
    const phoneCheck = this.phone.length >= 10;
    const addressCheck = this.address.trim().length > 0;
    const paymentCheck = this.payment !== "";
    return emailCheck && phoneCheck && addressCheck && paymentCheck;
  }
}
