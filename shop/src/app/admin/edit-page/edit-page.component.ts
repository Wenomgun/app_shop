import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../shared/product.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {IProduct, IProduct2} from "../../shared/const";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.less']
})
export class EditPageComponent implements OnInit {
  form: FormGroup = new FormGroup({
    type: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    photo: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required])
  });
  submitted: boolean = false;
  product: IProduct2 | undefined;
  constructor(
    private prodService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.
    pipe(switchMap((params: Params) => {
        return this.prodService.getById(params['id']);
      })
    ).subscribe((product) => {
      this.product = product;
      this.form = new FormGroup({
        type: new FormControl(this.product?.type, [Validators.required]),
        name: new FormControl(this.product?.name, [Validators.required]),
        photo: new FormControl(this.product?.photo, [Validators.required]),
        description: new FormControl(this.product?.description, [Validators.required]),
        price: new FormControl(this.product?.price, [Validators.required])
      });
    });
  }

  get type(): AbstractControl | null | undefined { return this.form?.get('type') }
  get name(): AbstractControl | null | undefined { return this.form?.get('name') }
  get photo(): AbstractControl | null | undefined { return this.form?.get('photo') }
  get description(): AbstractControl | null | undefined { return this.form?.get('description') }
  get price(): AbstractControl | null | undefined { return this.form?.get('price') }

  submit(): void {
    if (this.form.invalid) {
      return
    }
    this.submitted = true;
    const values = this.form.value;

    this.prodService.update({
      ...this.product,
      type: values.type,
      name: values.name,
      photo: values.photo,
      description: values.description,
      price: values.price,
      date: new Date()
    } as IProduct2).subscribe((res) => {
      this.submitted = false;
      this.router.navigate(['/admin', 'dashboard']);
    }, (error) => {
      this.submitted = false;
    });
  }

  ngOnInit(): void {
  }

}
