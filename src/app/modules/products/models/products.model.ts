import { CategoryModel } from "src/app/models/category.model";

export class ProductModel {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public category: CategoryModel
  ) {}
}