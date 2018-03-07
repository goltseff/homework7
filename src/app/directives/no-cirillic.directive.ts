import { Directive, forwardRef } from '@angular/core';
import { Validator, FormControl, NG_VALIDATORS } from '@angular/forms';
@Directive({
  selector: '[appNoCirilic]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => NoCirillicDirective), multi: true }
  ]
})
export class NoCirillicDirective implements Validator {

  constructor() { }

  validate (control: FormControl) {
    const error = {
      noCirillicErr: {
        valid: false
      }
    };

    const pattern = /^[А-я]+$/;

    return !pattern.test(control.value) ? null : error;
  }

}
