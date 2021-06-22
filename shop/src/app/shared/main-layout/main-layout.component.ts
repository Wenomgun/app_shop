import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.less']
})
export class MainLayoutComponent implements OnInit {
  type: string = 'phone';
  constructor(
    private router: Router,
    private prodService: ProductService
  ) { }

  setType(type: string): void {
    this.type = type;
    if (this.type !== 'basket') {
      this.router.navigate(['/'], {
        queryParams: {
          type: this.type
        }
      });
      this.prodService.setType(this.type);
    }
  }

  ngOnInit(): void {
  }

}
