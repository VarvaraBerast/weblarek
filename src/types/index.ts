export type ApiPostMethods = "POST" | "PUT" | "DELETE";

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods
  ): Promise<T>;
}
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}
export interface IBuyer {
  payment: "online" | "cash" | "";
  email: string;
  phone: string;
  address: string;
}

export interface IOrder extends IBuyer {
  payment: "online" | "cash";
  items: string[];
  total: number;
}
export interface IOrderResponse {
  id: string;
  total: number;
}
export interface IProductResponse {
  total: number;
  items: IProduct[];
}
export interface ICartAction {
  id:string;
}
export interface IOrderForm {
  payment:"online" | "cash";
  address:string;
}
export interface IContactsForm{
  email:string;
  phone:string;
}