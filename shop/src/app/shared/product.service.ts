import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {IProduct, IProductResponse} from "./const";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  create(product: IProduct): Observable<Object> {
    return this.http.post(`${environment.db_url}/products.json`, product)
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
}
