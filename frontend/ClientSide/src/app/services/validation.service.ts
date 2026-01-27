import { AbstractControl } from "@angular/forms";

export class ValidationService{

  static emailValidator(control:any) {
    // RFC 2822 compliant regex
    if (control.value == null || control.value == '' || control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return ({ 'invalidEmail': true });
    }
  }

  static passwordValidator(control:any) {
       if (control.value == null || control.value == '' || control.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }

 static matchPassword(group: AbstractControl): { [key: string]: any } | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  if (password === confirmPassword) {
    return null; // Success
  } else {
    // Set error on the specific control to trigger UI feedback
    group.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true }; 
  }
}


}