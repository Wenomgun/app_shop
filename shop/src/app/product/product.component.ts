import {Component, Input, OnInit} from '@angular/core';
import {IProduct} from "../shared/const";
import {ProductService} from "../shared/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {
  @Input() product: any | undefined;
  constructor(
    private prodService: ProductService
  ) { }

  addProduct(product: any): void {
    this.prodService.addProductToBasket(this.product);
  }

  ngOnInit(): void {
  }

}
