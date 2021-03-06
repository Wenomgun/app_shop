export const URL_EMAIL_PASS_LOGIN = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

export interface IUser {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface IResponseObj {
  idToken: string;
  expiresIn :string;
}

export interface IProduct {
  type: string;
  name: string;
  photo: string;
  description: string;
  price: string;
  date: Date;
}

export interface IProduct2 {
  id: string;
  type: string;
  name: string;
  photo: string;
  description: string;
  price: string;
  date: Date;
}

export interface IProductResponse {
  name: string;
}
