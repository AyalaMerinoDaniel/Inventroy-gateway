import { UserModel } from 'src/app/models/user.model';
import { PurchaseBaseModel } from './purchase-create-update.model';

export class PurchaseListModel extends PurchaseBaseModel{
  constructor(
    public id?: number,
    public createdAt?: Date,
    public user?: UserModel,
    public productCount?: number,
    public quantityTotal?: number,
  ) {
    super()
  }
}
