import { IApi, IProduct, IOrder, IOrderResponse } from "../../types/index";

export class ApiServices {
  private readonly api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  getProductList(): Promise<IProduct[]> {
    return this.api.get<IProduct[]>("/product/");
  }
  postOrder(orderInfo: IOrder): Promise<IOrderResponse> {
    return this.api.post<IOrderResponse>("/order/", orderInfo);
  }
}
