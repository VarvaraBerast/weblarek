import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form } from "./Form";

interface IContacts {
  email: string;
  phone: string;
}
export class Contacts extends Form<IContacts> {
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;
  constructor(protected events: IEvents, container: HTMLElement) {
    super(events, container);
    this.emailInput = ensureElement<HTMLInputElement>(
      'input[name="email"]',
      this.container
    );
    this.phoneInput = ensureElement<HTMLInputElement>(
      'input[name="phone"]',
      this.container
    );
    this.init();
  }
  init() {
    this.emailInput.addEventListener("input", () => this.validate());
    this.phoneInput.addEventListener("input", () => this.validate());
  }
  protected isValid(): boolean {
    return (
      this.emailInput.value.trim() !== "" && this.phoneInput.value.trim() !== ""
    );
  }
  protected submit(): void {
    this.events.emit("order:submit", {
      email: this.emailInput.value.trim(),
      phone: this.phoneInput.value.trim(),
    });
  }
  protected validate(): void {
    const errors: string[] = [];
    if (!this.emailInput) {
      errors.push("Введите почту");
    }
    if (!this.phoneInput.value.trim()) {
      errors.push("Введите номер телефона");
    }
    this.showErrors(errors);
    this.updateSubmitButton();
  }
}
