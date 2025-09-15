import { IProduct } from "../../../types/index";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";


export abstract class Card<T extends IProduct> extends Component<T> {
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;
    protected idElement:string = "";
  


    constructor(container:HTMLElement) {
        super(container);

        this.titleElement= ensureElement<HTMLElement>('.card__title', this.container)
        this.priceElement= ensureElement<HTMLElement>('.card__price', this.container)
       
    }
    set title(value:string){
        this.titleElement.textContent=value;
    }
    set price(value:number | null){
        if (value===null){
            this.priceElement.textContent= 'Бесценно';
        } else {
            this.priceElement.textContent=`${value} синапсов`;
        }
     }
     set id(id:string) {
        this.idElement=id;
        this.container.dataset.id=id;
     }
}
