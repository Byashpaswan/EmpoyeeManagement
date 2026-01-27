import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {

registerForm!:FormGroup

  constructor(private fb:FormBuilder){

  }

  ngOnInit(): void {

  this.registerForm = this.fb.group({
  firstName: ['', [Validators.required, Validators.minLength(2)]],
  lastName: ['', [Validators.required, Validators.minLength(2)]],
  email: ['', [Validators.required, ValidationService.emailValidator]],
  password: ['', [Validators.required, ValidationService.passwordValidator]],

  confirmPassword: ['', [Validators.required]], 
  role: ['EMPLOYEE', [Validators.required]], // Defaulted to EMPLOYEE
  dept: ['', [Validators.required]],
  joiningDate: [new Date().toISOString().substring(0, 10), [Validators.required]], // Defaults to today
  phoneNumber: ['', [Validators.pattern('^[0-9]{10}$')]] 
}, {
  // You can add a cross-field validator here to check if passwords match
  validators: ValidationService.matchPassword 
});
  }

  

 onSubmit() {
  if (this.registerForm.valid) {
    console.log("Form Data:", this.registerForm.value);
    // Proceed with API call
  } else {
    this.registerForm.markAllAsTouched();
  }
}
}
