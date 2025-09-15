import { IBuyer } from "../../../types/index";
import { EventEmitter } from "../Events";
export class Buyer {

  private payment: "online" | "cash" | "" = "";
  private email: string = "";
  private phone: string = "";
  private address: string = "";
  private events: EventEmitter;

  constructor(events: EventEmitter) {
   this.events=events;
  }

  public setPayment(payment: "online" | "cash" | ""): void {
    this.payment = payment;
    this.events.emit("buyer:changed", this.getData());
  }
  public setEmail(email: string): void {
    this.email = email;
    this.events.emit("buyer:changed", this.getData());

  }
  public setPhone(phone: string): void {
    this.phone = phone;
    this.events.emit("buyer:changed", this.getData());

  }
  public setAddress(address: string): void {
    this.address = address;
    this.events.emit("buyer:changed", this.getData());

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
    this.events.emit("buyer:changed", this.getData());

  }
  public checkData(): boolean {
    const emailCheck = this.email.includes("@") && this.email.includes(".");
    const phoneCheck = this.phone.length >= 10;
    const addressCheck = this.address.trim().length > 0;
    const paymentCheck = this.payment !== "";
    return emailCheck && phoneCheck && addressCheck && paymentCheck;
  }
}
