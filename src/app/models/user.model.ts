export class UserModel {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public role: string,
    public deletetAt: Date
  ) {}
}
