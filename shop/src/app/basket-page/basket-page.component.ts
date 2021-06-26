import { Component, OnInit } from '@angular/core';
import {ProductService} from "../shared/product.service";
import {IProduct, IProduct2} from "../shared/const";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../shared/order.service";

@Component({
  selector: 'app-basket-page',
  templateUrl: './basket-page.component.html',
  styleUrls: ['./basket-page.component.less']
})
export class BasketPageComponent implements OnInit {
  basketProducts: IProduct2[] = [];
  totalPrice: number = 0;

  form: FormGroup;
  submitted: boolean = false;

  constructor(
    private prodService: ProductService,
    private orderService: OrderService
  ) {
    this.basketProducts = this.prodService.basketProducts;

    for(let i = 0; i < this.basketProducts.length; i++) {
      this.totalPrice += +this.basketProducts[i].price;
    }

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null),
      phone: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      paymentType: new FormControl('card')
    });
  }

  get name(): AbstractControl | null { return this.form.get('name') }
  get email(): AbstractControl | null { return this.form.get('email') }
  get phone(): AbstractControl | null { return this.form.get('phone') }
  get address(): AbstractControl | null { return this.form.get('address') }
  get paymentType(): AbstractControl | null { return this.form.get('paymentType') }

  removeProduct(basketProduct: any): void {
    this.prodService.removeProduct(basketProduct.id);
    this.basketProducts = this.prodService.basketProducts;
    this.totalPrice -= +basketProduct.price;
  }

  submit(): void {
    if (this.form.invalid) {
      return
    }
    this.submitted = true;
    const values = this.form.value;
    const order: any = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: values.address,
      orders: this.basketProducts,
      paymentType: values.paymentType,
      price: this.totalPrice,
      date: new Date()
    }
    this.orderService.create(order).subscribe((res) => {
      this.form.reset();
      this.submitted = false;
    }, (error) => {
      this.submitted = false;
    });
  }

  ngOnInit(): void {
  }

}
