import "./scss/styles.scss";
import "./types/index";
import { Product } from "./components/base/Models/Product";
import { Cart } from "./components/base/Models/Cart";
import { Buyer } from "./components/base/Models/Buyer";
import { apiProducts } from "./utils/data";
import { ApiServices } from "./components/base/ApiServices";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";

export const productModel = new Product();
export const cartModel = new Cart();
export const buyerModel = new Buyer();
export const api = new Api(API_URL);
export const apiServices = new ApiServices(api);

productModel.setProducts(apiProducts.items);
console.log("Массив товаров из каталога: ", productModel.getProducts());
console.log(
  "Товар по id:",
  productModel.getProductById(apiProducts.items[0].id)
);
productModel.setPreviewProduct(apiProducts.items[3]);
console.log(
  "Товар с подробным отображением:",
  productModel.getPreviewProduct()
);

console.log("Массив товаров в корзине: ", cartModel.getProductsInCart());
cartModel.addProductToCart(apiProducts.items[1]);
cartModel.addProductToCart(apiProducts.items[0]);
console.log("Корзина после добавления:", cartModel.getProductsInCart());
console.log("Общая стоимость товаров в корзине:", cartModel.getTotalPrice());
console.log("Количество товаров в корзине:", cartModel.getProductCount());
console.log(
  "Наличие товара в коризине по id:",
  cartModel.checkCartById(apiProducts.items[0].id)
);
cartModel.removeProductFromCart(apiProducts.items[1].id);
console.log("Корзина после удаления товара:", cartModel.getProductsInCart());
cartModel.clearCart();
console.log("Корзина после полного очищения:", cartModel.getProductsInCart());

buyerModel.setAddress("Spb Vosstania");
buyerModel.setEmail("test@test.ru");
buyerModel.setPhone("+71234567890");
buyerModel.setPayment("online");
console.log("Установленные данные покупателя:", buyerModel.getData());
console.log("Проверка данных покупателя", buyerModel.checkData());
buyerModel.clearData();
console.log("Данные покупателя после полного очищения:", buyerModel.getData());

apiServices.getProductList()
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
