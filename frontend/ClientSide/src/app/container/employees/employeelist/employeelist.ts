import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { CommonModule } from '@angular/common';
import { Employee } from '../../../../shared/models/employee.model';
import { RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged, startWith, Subject, switchMap, takeUntil } from 'rxjs';

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

  constructor(private employeeService: EmployeeService) {}

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
    this.employeeService.delete(id).subscribe(() => {
      // refresh after delete
      this.search$.next('');
      this.ngOnInit()
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
