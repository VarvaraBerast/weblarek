import { IProduct } from "../../../types/index";
import { categoryMap } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Card } from "./Card";
interface ICardPreview extends Pick<IProduct, "id" | "title"> {
  price: number | null;
  description: string;
  category: string;
  image: string;
  inBasket: boolean;
}
type CategoryKey = keyof typeof categoryMap;

export class CardPreview extends Card<ICardPreview> {
  protected descriptionElement: HTMLElement;
  protected categoryElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;
  protected imageElement: HTMLImageElement;
  protected _inBasket: boolean = false;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.descriptionElement = ensureElement<HTMLElement>(
      ".card__text",
      this.container
    );
    this.categoryElement = ensureElement<HTMLElement>(
      ".card__category",
      this.container
    );
    this.buttonElement = ensureElement<HTMLButtonElement>(
      ".card__button",
      this.container
    );
    this.imageElement = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container
    );

    this.buttonElement.addEventListener("click", () => {
      if (this._inBasket) {
        this.events.emit("cart:removeFromBasket", { id: this.idElement });
      } else {
        this.events.emit("cart:addToBasket", { id: this.idElement });
      }
    });
  }
  set description(value: string) {
    this.descriptionElement.textContent = value;
  }
  set category(value: string) {
    this.categoryElement.textContent = value;
    for (const key in categoryMap) {
      this.categoryElement.classList.toggle(
        categoryMap[key as CategoryKey],
        key === value
      );
    }
  }

  set image(value: string) {
    if (this.imageElement) {
      this.setImage(this.imageElement, value, this.title);
    }
  }
  set inBasket(value: boolean) {
    this._inBasket = value;
    if (value) {
      this.buttonElement.textContent = "Удалить из корзины";
    } else {
      this.buttonElement.textContent = "Купить";
    }
  }
  set price(value: number | null) {
    super.price = value;
    if (value === null) {
      this.buttonElement.textContent = "";
      this.buttonElement.disabled = true;
    } else {
      this.buttonElement.disabled = false;
    }
  }
}
