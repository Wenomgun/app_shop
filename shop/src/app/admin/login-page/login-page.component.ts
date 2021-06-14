import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    })
  }

  get email(): AbstractControl | null { return this.form.get('email')};
  get password(): AbstractControl | null { return this.form.get('password')};

  submit(): void {

  }

  consoleLog(obj: any): void {
    console.log(obj);
  }
  ngOnInit(): void {

  }

}
