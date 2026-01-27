import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const Route = inject(Router)

  if(authService.isLoggedIn()){
     return true
  }
  else{
    Route.navigate(['/login'])
    return false;

  }

};
