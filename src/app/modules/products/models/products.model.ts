import { CategoryModel } from "src/app/models/category.model";

export class ProductLIstModel {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public price?: number,
    public category?: CategoryModel
  ) {}
}

export class CreateOrUpdateProductModel {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public price?: number,
    public categoryId?: number
  ) {}
}