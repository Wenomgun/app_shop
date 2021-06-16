import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IUser, URL_EMAIL_PASS_LOGIN } from './const';
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: IUser) {
    return this.http.post(`${URL_EMAIL_PASS_LOGIN}${environment.apiKey}`, user)
      .pipe(
        tap(this._setToken)
      );
  }

  /**
   * Set token in local storage
   * @param response
   * @private
   */
  private _setToken(response: any): void {
    if (response) {
      const extDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fbTokenExpDate', extDate.toString());
      localStorage.setItem('fbToken', response.idToken);
    } else {
      localStorage.clear();
    }
  }

  /**
   * Get active token
   */
  get token(): string | null {
    const extDate = new Date(localStorage.getItem('fbTokenExpDate') + '');
    if (extDate < new Date()) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fbToken');
  }

  logout(): void {
    this._setToken(null);
  }

  isAuth(): boolean {
    return !!this.token;
  }

}
