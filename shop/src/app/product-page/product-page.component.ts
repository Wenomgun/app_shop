import { Component, OnInit } from '@angular/core';
import {ProductService} from "../shared/product.service";
import {ActivatedRoute, Params} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {Observable} from "rxjs";
import {IProduct} from "../shared/const";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.less']
})
export class ProductPageComponent implements OnInit {
  product$: Observable<IProduct>;
  constructor(
    private prodService: ProductService,
    private router: ActivatedRoute) {
    this.product$ = this.router.params
      .pipe(switchMap((params: Params) => {
        return this.prodService.getById(params['id'])
      }))
  }

  ngOnInit(): void {

  }

}
