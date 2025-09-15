import "./scss/styles.scss";
import "./types/index";
import { Product } from "./components/base/Models/Product";
import { Cart } from "./components/base/Models/Cart";
import { Buyer } from "./components/base/Models/Buyer";
import { ApiServices } from "./components/base/ApiServices";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";
import { CDN_URL } from "./utils/constants";
import { Header } from "./components/View/Header";
import { cloneTemplate, ensureElement } from "./utils/utils";
import { EventEmitter } from "./components/base/Events";
import { Gallery } from "./components/View/Gallery";
import { CardCatalog } from "./components/View/card/CardCatalogs";
import { CardBasket } from "./components/View/card/CardBasket";
import { Modal } from "./components/View/Modal";
import { CardPreview } from "./components/View/card/CardPreview";
import { Basket } from "./components/View/Basket";
import {
  IBuyer,
  ICartAction,
  IContactsForm,
  IOrderForm,
  IProduct,
} from "./types/index";
import { Order } from "./components/View/form/Order";
import { Contacts } from "./components/View/form/Contacts";
import { Success } from "./components/View/Success";

const headerElement = document.querySelector(".header") as HTMLElement;
const galleryElement = document.querySelector(".gallery") as HTMLElement;
const modalContainer = ensureElement<HTMLElement>("#modal-container");
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>("#card-catalog");
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>("#card-preview");
const cardBasketTemplate = ensureElement<HTMLTemplateElement>("#card-basket");
const orderTemplate = ensureElement<HTMLTemplateElement>("#order");
const contactsTemplate = ensureElement<HTMLTemplateElement>("#contacts");
const successTemplate = ensureElement<HTMLTemplateElement>("#success");
const basketTemplate = ensureElement<HTMLTemplateElement>("#basket");

export const events = new EventEmitter();
export const productModel = new Product(events);
export const cartModel = new Cart(events);
export const buyerModel = new Buyer(events);
export const api = new Api(API_URL);
export const apiServices = new ApiServices(api);
export const header = new Header(events, headerElement);
export const gallery = new Gallery(galleryElement);
export const modal = new Modal(events, modalContainer);

apiServices
  .getProductList()
  .then((products) => {
    productModel.setProducts(products);
    console.log(
      "Список товаров полученных из сервера:",
      productModel.getProducts()
    );
  })
  .catch((error) => {
    console.error("Ошибка получения товаров:", error);
  });

events.on("card:changed", () => {
  const products = productModel.getProducts();
  const itemsCards = products.map((product) => {
    const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), {
      onClick: () => events.emit("card:select", product),
    });
    card.id = product.id;
    card.title = product.title;
    card.category = product.category;
    card.image = CDN_URL + product.image;
    card.price = product.price;
    return card.render();
  });
  gallery.catalog = itemsCards;
});

events.on("cart:open", () => {
  const basketItems = cartModel.getProductsInCart();
  const basketElements = basketItems.map((item, index) => {
    const basketCardContainer = cloneTemplate(cardBasketTemplate);
    const basketCard = new CardBasket(events, basketCardContainer);
    return basketCard.render({
      ...item,
      counter: index + 1,
    });
  });
  const basketContainer = cloneTemplate(basketTemplate);
  const basket = new Basket(basketContainer, events);
  const basketContent = basket.render({
    itemsList: basketElements,
    total: cartModel.getTotalPrice(),
  });
  modal.content = basketContent;
  modal.open();
});

events.on("cart:addToBasket", (data: ICartAction) => {
  const product = productModel.getProductById(data.id);
  if (product) {
    cartModel.addProductToCart(product);
    modal.close();
  }
});
events.on("cart:removeFromBasket", (data: ICartAction) => {
  cartModel.removeProductFromCart(data.id);
  modal.close();
});
events.on("preview:changed", (product: IProduct) => {
  const inBasket = cartModel.checkCartById(product.id);
  const previewCard = new CardPreview(
    cloneTemplate(cardPreviewTemplate),
    events
  );
  previewCard.id = product.id;
  previewCard.title = product.title;
  previewCard.category = product.category;
  previewCard.image = CDN_URL + product.image;
  previewCard.price = product.price;
  previewCard.description = product.description;
  previewCard.inBasket = inBasket;
  modal.content = previewCard.render();
  modal.open();
});
events.on("card:select", (product: IProduct) => {
  productModel.setPreviewProduct(product);
});

events.on("cart:changed", () => {
  cartModel.getProductCount();
  const count = cartModel.getProductCount();
  header.counter = count;
});
events.on("cart:checkout", () => {
  const orderForm = new Order(events, cloneTemplate(orderTemplate));
  const renderOrder = orderForm.render();
  modal.content = renderOrder;
});
events.on("order:next", (data: IOrderForm) => {
  buyerModel.setPayment(data.payment);
  buyerModel.setAddress(data.address);
  const contactsForm = new Contacts(events, cloneTemplate(contactsTemplate));
  const renderContacts = contactsForm.render();
  modal.content = renderContacts;
});
events.on("order:submit", (data: IContactsForm) => {
  buyerModel.setEmail(data.email);
  buyerModel.setPhone(data.phone);
  const total = cartModel.getTotalPrice();
  cartModel.clearCart();
  const success = new Success(events, cloneTemplate(successTemplate));
  success.total = total;
  const renderSuccess = success.render();
  modal.content = renderSuccess;
  modal.open();
});
events.on("success:close", () => {
  modal.close();
});
events.on("buyer:changed",(data: IBuyer) =>{
  if (data.payment && data.address && data.email && data.phone){
    buyerModel.checkData()
  }
})