import { Injectable } from '@angular/core';
import {IProduct, IProduct2, IProductResponse} from "./const";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  urlOrders: string = `${environment.db_url}/orders.json`;
  constructor(private http: HttpClient) { }

  create(order: any): Observable<Object> {
    return this.http.post(this.urlOrders, order)
      .pipe(
        map((res: Object) => {
          return {
            ...order,
            id: (res as IProductResponse).name,
            date: new Date(order.date)
          };
        })
      );
  }

  query(): Observable<any> {
    return this.http.get(this.urlOrders)
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

  removeById(id: string): Observable<any> {
    return this.http.delete(`${environment.db_url}/orders/${id}.json`);
  }

}
