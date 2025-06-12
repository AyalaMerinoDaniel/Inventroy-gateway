import { UserModel } from 'src/app/models/user.model';

export class LoginModel {
  constructor(public email: string, public password: string) {}
}

export class ResponseLoginModel {
  constructor(
    public token: string,
    public refreshToken: string,
    public user: UserModel
  ) {}
}
