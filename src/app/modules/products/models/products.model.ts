import { BaseNamedModel } from "src/app/models/base-models/base-name-model";
import { CategoryModel } from "src/app/models/category.model";
import { GenericOption } from "src/app/models/selector/select-request-body.model";

export class ProductLIstModel extends BaseNamedModel {
  constructor(
    public price?: number,
    public stock?: number,
    public category?: CategoryModel
  ) {
    super()
  }
}

export class CreateOrUpdateProductModel extends BaseNamedModel {
  constructor(
    public price?: number,
    public stock?: number,
    public categoryId?: number | GenericOption
  ) {
    super()
  }
}