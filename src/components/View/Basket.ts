import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IBasket {
  itemsList: HTMLElement[];
  total: number;
}
export class Basket extends Component<IBasket> {
  protected basketList: HTMLElement;
  protected basketButton: HTMLButtonElement;
  protected totalPrice: HTMLElement;
  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);
    this.basketButton = ensureElement<HTMLButtonElement>(
      ".basket__button",
      this.container
    );
    this.basketList = ensureElement<HTMLElement>(
      ".basket__list",
      this.container
    );
    this.totalPrice = ensureElement<HTMLElement>(
      ".basket__price",
      this.container
    );
    this.basketButton.addEventListener("click", () => {
      this.events.emit("cart:checkout");
    });
  }

  set itemsList(items: HTMLElement[]) {
    if (items.length === 0) {
      this.basketList.textContent = "Корзина пуста";
      this.basketList.style.color = "gray";
    } else {
      this.basketList.innerHTML = "";
      items.forEach((item) => this.basketList.appendChild(item));
    }

    this.basketButton.disabled = items.length === 0;
  }
  set total(value: number) {
    this.totalPrice.textContent = `${value} синапсов`;
  }
}
