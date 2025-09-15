import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface ISuccess {
  total: number;
}
export class Success extends Component<ISuccess> {
  protected successButton: HTMLButtonElement;
  protected descriptionElement: HTMLElement;
  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this.successButton = ensureElement<HTMLButtonElement>(
      ".order-success__close",
      this.container
    );
    this.descriptionElement = ensureElement<HTMLElement>(
      ".order-success__description",
      this.container
    );

    this.successButton.addEventListener("click", () => {
      this.events.emit("success:close");
    });
  }

  set total(value: number) {
    this.descriptionElement.textContent = `Списано ${value} синапсов`;
  }
}
