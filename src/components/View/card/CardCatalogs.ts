import { IProduct } from "../../../types/index";
import { categoryMap } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";

export interface ICardActions {
  onClick?: (event: MouseEvent) => void;
}

type CategoryKey = keyof typeof categoryMap;
export type TCardCatalog = Pick<
  IProduct,
  "image" | "category" | "title" | "price" | "description" | "id"
>;

export class CardCatalog extends Card<TCardCatalog> {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.categoryElement = ensureElement<HTMLElement>(
      ".card__category",
      this.container
    );
    this.imageElement = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container
    );

    if (actions?.onClick) {
      this.container.addEventListener("click", actions.onClick);
    }
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
}
