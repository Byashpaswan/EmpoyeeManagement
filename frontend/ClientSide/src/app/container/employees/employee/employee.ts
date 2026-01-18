import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee implements OnInit {
  isEdit = false;
  id!: number;
  loginForm!: FormGroup;
   submitted = false;

    departments: string[] = [
    'Engineering',
    'HR',
    'Finance',
    'Marketing',
    'Sales',
    'Operations'
  ];

  constructor(
    private fb: FormBuilder,
    private service: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required,Validators.minLength(2),Validators.pattern(/^[a-zA-Z]+([ '.-][a-zA-Z]+)*$/)]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      salary: ['', [Validators.required,Validators.min(1)]],
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEdit = true;
      this.service.getById(this.id).subscribe((res) => 
        this.loginForm.patchValue(res[0])
    );
    }
  }
  get f() {
    return this.loginForm.controls;
  }

  submit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    const req = this.isEdit
      ? this.service.update(this.id, this.loginForm.value)
      : this.service.create(this.loginForm.value);

    req.subscribe(() => this.router.navigate(['/employees']));
  }
}
