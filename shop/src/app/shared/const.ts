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
