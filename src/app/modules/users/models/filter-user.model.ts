import { GetListBaseModel } from 'src/app/models/base-models/get-list-base.model';

export class GetListUsersModel extends GetListBaseModel {
  constructor(
    public name: string,
    public status: string,
    public userType: string
  ) {
    super();
  }
}
