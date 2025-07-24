import { GenericOption } from "src/app/models/selector/select-request-body.model";
import { ProductLIstModel } from "../../products/models/products.model";

export class PurchaseBaseModel {
  constructor(
    public total?: number,
    public items?: ItemsPurchaseModel[] | ItemsPurchaseDetailsModel[],
    public customerName?: string
  ){}
}

export class CreatePurchaseModel extends PurchaseBaseModel{
  constructor(
    public userId?: number | GenericOption,
  ) {
    super()
  }
}

export class ItemsPurchaseModel {
  constructor(public productId: number, public quantity: number) {}
}

export class ItemsPurchaseDetailsModel {
  constructor(
    public id?: number,
    public quantity?: number,
    public product?: ProductLIstModel
  ){}
}
