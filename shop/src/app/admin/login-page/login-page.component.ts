import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../../shared/const';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    })
  }

  get email(): AbstractControl | null { return this.form.get('email')};

  get password(): AbstractControl | null { return this.form.get('password')};

  /**
   * Post admin form
   */
  submit(): void {
    const values = this.form.value;
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const user: IUser = {
      email: values.email,
      password: values.password,
      returnSecureToken: true
    };
    this.auth.login(user).subscribe((res) => {
      console.log(res);
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard']);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    })
  }

  consoleLog(obj: any): void {
    console.log(obj);
  }
  ngOnInit(): void {

  }

}
