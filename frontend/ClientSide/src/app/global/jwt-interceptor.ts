import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('currentUserToken');

  if(token){
    const cloned = req.clone({
       setHeaders:{
        Authorization:`${token}`
       }
    })
    return next(cloned)
  }

  return next(req);
};
