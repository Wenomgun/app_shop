import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {IProduct, IProduct2, IProductResponse} from "./const";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  type: string = 'phone';
  basketProducts :IProduct2[] = [];
  urlProducts: string = `${environment.db_url}/products.json`;
  constructor(private http: HttpClient) { }

  create(product: IProduct): Observable<Object> {
    return this.http.post(this.urlProducts, product)
      .pipe(
        map((res: Object) => {
          return {
            ...res,
            id: (res as IProductResponse).name,
            date: new Date(product.date)
          };
        })
      );
  }

  query(): Observable<any> {
    return this.http.get(this.urlProducts)
      .pipe(map((res: any) => {
        return Object.keys(res)
          .map((key: string) => {
            return {
              ...res[key],
              id: key,
              date: new Date(res[key].date)
            }
          })
      }))
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${environment.db_url}/products/${id}.json`)
      .pipe(map((res: any) => {
        return {
          ...res,
          id,
          date: new Date(res.date)
        }
      }))
  }

  removeById(id: string): Observable<any> {
    return this.http.delete(`${environment.db_url}/products/${id}.json`);
  }

  update(product: IProduct2): Observable<any> {
    return this.http.patch(`${environment.db_url}/products/${product.id}.json`, product);
  }

  setType(type: string): void {
    this.type = type;
  }

  addProductToBasket(product: IProduct2): void {
    this.basketProducts.push(product);
  }

  removeProduct(basketProductId: string): void {
    this.basketProducts = this.basketProducts.filter((basketProduct) => {
      return basketProduct.id !== basketProductId;
    })
  }
}
