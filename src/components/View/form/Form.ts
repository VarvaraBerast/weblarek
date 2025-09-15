import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";


export abstract class Form<T> extends Component<T> {
  protected submitButton: HTMLButtonElement;
  protected errorsElement: HTMLElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this.submitButton = ensureElement<HTMLButtonElement>(
      'button[type="submit"]',
      this.container
    );
    this.errorsElement = ensureElement<HTMLElement>(
      ".form__errors",
      this.container
    );

    this.container.addEventListener("submit", this.handleSubmit.bind(this));
  }

  protected handleSubmit(event: Event) {
    event?.preventDefault();
    if (this.isValid()) {
      this.submit();
    }
  }
  protected abstract isValid(): boolean;

  protected abstract submit(): void;

  protected updateSubmitButton() {
    this.submitButton.disabled = !this.isValid();
  }

  protected showErrors(errors: string[]) {
    this.errorsElement.textContent = errors.join(", ");
  }
}
