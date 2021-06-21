import { Component, OnInit } from '@angular/core';
import {IProduct2} from "../../shared/const";
import {ProductService} from "../../shared/product.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  products: IProduct2[] = [];
  querySub: Subscription | undefined;
  removeSub: Subscription | undefined;
  productName: string = '';
  constructor(private prodService: ProductService) {
    this. querySub = this.prodService.query().subscribe((products) => {
      this.products = products;
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.querySub) {
      this.querySub.unsubscribe();
    }
    if (this.removeSub) {
      this.removeSub.unsubscribe();
    }
  }

  remove(id: string): void {
    this.removeSub = this.prodService.removeById(id).subscribe(() => {
      this.products = this.products.filter((product) => {
        return product.id != id;
      })
    });
  }

}
