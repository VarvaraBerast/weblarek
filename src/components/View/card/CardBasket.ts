import { IProduct } from "../../../types/index";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Card } from "./Card";

interface ICardBasket
  extends Pick<
    IProduct,
    "id" | "title" | "price" | "description" | "image" | "category"
  > {
  counter: number;
}
export class CardBasket extends Card<ICardBasket> {
  protected counterElement: HTMLElement;
  protected basketButtonDelete: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this.counterElement = ensureElement<HTMLElement>(
      ".basket__item-index",
      this.container
    );
    this.basketButtonDelete = ensureElement<HTMLButtonElement>(
      ".basket__item-delete",
      this.container
    );
    this.basketButtonDelete.addEventListener("click", () => {
      const id = this.container.dataset.id;
      if (id) {
        this.events.emit("cart:removeFromBasket", { id: id });
      }
    });
  }
  set counter(value: number) {
    this.counterElement.textContent = String(value);
  }
}
