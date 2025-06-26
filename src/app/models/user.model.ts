export class UserModel {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public role: string,
    public password?: string,
    public deletetAt?: Date
  ) {}
}
