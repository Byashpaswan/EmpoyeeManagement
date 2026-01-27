import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error)=>{
      if(error.status===403){
        localStorage.removeItem('currentUserToken');
         inject(Router).navigate(['/login'])
      }
     return throwError(()=>error)
    })
  );
};
