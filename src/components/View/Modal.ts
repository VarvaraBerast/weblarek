import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IModal {
  content: string;
}
export class Modal extends Component<IModal> {
  protected closeButton: HTMLButtonElement;
  protected contentContainer: HTMLElement;
  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this.closeButton = ensureElement<HTMLButtonElement>(
      ".modal__close",
      this.container
    );
    this.contentContainer = ensureElement<HTMLElement>(
      ".modal__content",
      this.container
    );

    this.closeButton.addEventListener("click", () => this.close());
    this.container.addEventListener("click", (event) => {
      if (event.target === this.container) {
        this.close()
      }
    });
  }
  set content(content: HTMLElement) {
    this.contentContainer.innerHTML = "";
    this.contentContainer.appendChild(content);
  }
  open(): void {
    this.container.classList.add("modal_active");
  }
  close(): void {
    this.container.classList.remove("modal_active");
  }
}
