export interface User {
  id?: number;
  login: string;
  password: string;
  token?: number;
  expireDate?: Date;
}
