import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from "@angular/forms";

@Directive({
  selector: '[appPasswordValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: 'PasswordValidatorDirective',
    multi: true
  }]
})
export class PasswordValidatorDirective implements Validator {

  @Input('appPasswordValidator') pass: string = '';

  validate(control: AbstractControl): ValidationErrors | null {
    return this.pass ? this.checkPassMask(new RegExp(this.pass, 'i'))(control) : null;
  }

  checkPassMask(passRegExp: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const checkPass = passRegExp.test(control.value);
      return checkPass ? {msg: {value: control.value}} : null;
    }
  }

}
