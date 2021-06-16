import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../shared/product.service";
import {IProduct} from "../../shared/const";

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.less']
})
export class AddPageComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  constructor(
    private prodService: ProductService
  ) {
    this.form = new FormGroup({
      type: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      photo: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required])
    });
  }

  get type(): AbstractControl | null { return this.form.get('type') }
  get name(): AbstractControl | null { return this.form.get('name') }
  get photo(): AbstractControl | null { return this.form.get('photo') }
  get description(): AbstractControl | null { return this.form.get('description') }
  get price(): AbstractControl | null { return this.form.get('price') }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.form.invalid) {
      return
    }
    this.submitted = true;
    const values = this.form.value;
    const product: IProduct = {
      type: values.type,
      name: values.name,
      photo: values.photo,
      description: values.description,
      price: values.price,
      date: new Date()
    }
    this.prodService.create(product).subscribe((res) => {
      console.log(res);
      this.form.reset();
      this.submitted = false;
    }, (error) => {
      this.submitted = false;
      console.log(error);
    });

  }

}
