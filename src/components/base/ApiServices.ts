import { IProduct, IOrder, IOrderResponse, IProductResponse } from "../../types/index";
import { Api } from "./Api";

export class ApiServices  extends Api{

  constructor(baseUrl: string, options: RequestInit={}) {
    super(baseUrl, options)
  }

  getProductList(): Promise<IProduct[]> {
    return this.get<IProductResponse>("/product/")
    .then ((response)=>{
      return response.items
    })
  }
  postOrder(orderInfo: IOrder): Promise<IOrderResponse> {
    return this.post<IOrderResponse>("/order/", orderInfo);
  }
}
