import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { CommonModule } from '@angular/common';
import { Employee } from '../../../../shared/models/employee.model';
import { RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged, startWith, Subject, switchMap, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employeelist',
  imports: [CommonModule,RouterLink],
  templateUrl: './employeelist.html',
  styleUrl: './employeelist.css',
})
export class Employeelist implements OnInit {
employees: Employee[] = [];

   // search stream
  private search$ = new Subject<string>();

  // cleanup stream
  private destroy$ = new Subject<void>();
  date:Date = new Date()

  constructor(private employeeService: EmployeeService,private toastService:ToastrService) {}

  ngOnInit(): void {
    this.search$
      .pipe(
        startWith(''),               // initial load
        debounceTime(400),            // wait for typing to stop
        distinctUntilChanged(),       // ignore same value
        switchMap((term) =>
          this.employeeService.getAll(term)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((employees) => {
        this.employees = employees;
      });
  }

  // triggered from template
  onSearch(value: string): void {
    this.search$.next(value.trim());
  }

  delete(id: number): void {
  this.employeeService.delete(id).subscribe({
    next: (res:any) => {
      this.employees = this.employees.filter(e => e.id !== id);
      this.toastService.success(res['message'],'success')
    },
    error: (err) => {
      console.error('Delete failed');
      this.toastService.error('something went wrong','error')
    }
  });
}

  // ngFor optimization
  trackByEmployeeId(index: number, employee: Employee): number {
    return employee.id!;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
