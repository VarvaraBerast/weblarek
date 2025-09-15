import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form } from "./Form";
interface IOrder {
  payment: string;
  address: string;
}
export class Order extends Form<IOrder> {
  protected cardButton: HTMLButtonElement;
  protected cashButton: HTMLButtonElement;
  protected addressInput: HTMLInputElement;
  protected selectedPayment: string = "";

  constructor(events: IEvents, container: HTMLElement) {
    super(events, container);
    this.cardButton = ensureElement<HTMLButtonElement>(
      'button[name="card"]',
      this.container
    );
    this.cashButton = ensureElement<HTMLButtonElement>(
      'button[name="cash"]',
      this.container
    );
    this.addressInput = ensureElement<HTMLInputElement>(
      'input[name="address"]',
      this.container
    );
    this.init();
  }
  init() {
    this.cardButton.addEventListener("click", () => {
      this.selectedPayment = "card";
      this.updatePaymentButton();
      this.validate();
    });
    this.cashButton.addEventListener("click", () => {
      this.selectedPayment = "cash";
      this.updatePaymentButton();
      this.validate();
    });
    this.addressInput.addEventListener("input", () => this.validate());
  }
  protected updatePaymentButton(): void {
    this.cardButton.classList.remove("button_alt-active");
    this.cashButton.classList.remove("button_alt-active");
    if (this.selectedPayment === "card") {
      this.cardButton.classList.add("button_alt-active");
    } else if (this.selectedPayment === "cash") {
      this.cashButton.classList.add("button_alt-active");
    }
  }
  protected isValid(): boolean {
    return this.selectedPayment !== "" && this.addressInput.value.trim() !== "";
  }
  protected submit(): void {
    this.events.emit("order:next", {
      payment: this.selectedPayment,
      address: this.addressInput.value.trim(),
    });
  }
  protected validate(): void {
    const errors: string[] = [];
    if (!this.selectedPayment) {
      errors.push("Выберите способ оплаты");
    }
    if (!this.addressInput.value.trim()) {
      errors.push("Необходимо указать адрес");
    }
    this.showErrors(errors);
    this.updateSubmitButton();
  }
}
