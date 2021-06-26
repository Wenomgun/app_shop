import { Component, OnInit } from '@angular/core';
import {ProductService} from "../shared/product.service";
import {ActivatedRoute, Params} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {Observable} from "rxjs";
import {IProduct, IProduct2} from "../shared/const";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.less']
})
export class ProductPageComponent implements OnInit {
  product$: Observable<IProduct2>;
  constructor(
    private prodService: ProductService,
    private router: ActivatedRoute) {
    this.product$ = this.router.params
      .pipe(switchMap((params: Params) => {
        return this.prodService.getById(params['id'])
      }))
  }

  addProduct(product: IProduct2): void {
    this.prodService.addProductToBasket(product);
  }

  ngOnInit(): void {

  }

}
