import {Component, Input, OnInit} from '@angular/core';
import {IProduct} from "../shared/const";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {
  @Input() product: any | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
