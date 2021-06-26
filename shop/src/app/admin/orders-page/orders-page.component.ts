import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {OrderService} from "../../shared/order.service";

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.less']
})
export class OrdersPageComponent implements OnInit {
  orders: any[] = [];
  querySub: Subscription | undefined;
  removeSub: Subscription | undefined;

  constructor(private orderService: OrderService) {
    this.querySub = this.orderService.query().subscribe((orders) => {
      this.orders = orders;
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
    this.removeSub = this.orderService.removeById(id).subscribe(() => {
      this.orders = this.orders.filter((order) => {
        return order.id != id;
      })
    });
  }

}
