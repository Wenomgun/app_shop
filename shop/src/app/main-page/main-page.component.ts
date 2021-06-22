import { Component, OnInit } from '@angular/core';
import {ProductService} from "../shared/product.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less']
})
export class MainPageComponent implements OnInit {
  products$: Observable<any> | undefined;
  constructor(public prodService: ProductService) {
    this.products$ = this.prodService.query();
  }

  ngOnInit(): void {

  }

}
