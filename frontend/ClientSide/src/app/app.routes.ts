import { Routes } from '@angular/router';
export const routes: Routes = [
 
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./container/dashboard/dashboard').then((c) => c.Dashboard),
  },
  {
    path: 'employees',
    loadComponent: () =>
      import('./container/employees/employeelist/employeelist').then(
        (c) => c.Employeelist,
      ),
  },
  {
    path: 'employees/add',
    loadComponent: () =>
      import('./container/employees/employee/employee').then((c) => c.Employee),
  },
  {
    path: 'employees/edit/:id',
    loadComponent: () =>
      import('./container/employees//employee/employee').then(
        (c) => c.Employee,
      ),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
