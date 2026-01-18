import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const httpErrorinterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error) => {
      let message = 'Something went wrong';

      if (error.error?.message) {
        message = error.error.message;
      } else if (error.status === 0) {
        message = 'Server unreachable';
      } else if (error.status >= 500) {
        message = 'Internal server error';
      }

      console.error('HTTP Error:', message);
      toastr.error(message);

      return throwError(() => error);
    })
  );
};
