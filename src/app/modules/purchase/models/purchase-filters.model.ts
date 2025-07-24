import { GetListBaseModel } from 'src/app/models/base-models/get-list-base.model';

export class PurchaseFiltersModel extends GetListBaseModel {
  constructor(
    public startDate: string,
    public endDate: string,
    public userId: number
  ) {
    super();
  }
}
