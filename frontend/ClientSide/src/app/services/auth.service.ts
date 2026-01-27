import { Injectable } from '@angular/core';
import { environment } from '../../envronments/envronment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private readonly getSubDomain =`${environment.scheme}${environment.apiUrl}/employee`;

    constructor(private http:HttpClient){

    }

    register(employee:any){
      return this.http.post(`${this.getSubDomain}/register`,employee)
    }

    login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.getSubDomain}/login`, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          // Store token in local storage to keep user logged in
          localStorage.setItem('currentUserToken', response.token);
        }
      })
    );
  }

  // Check if token exists
  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUserToken');
  }

  // Logout
  logout(): void {
    localStorage.removeItem('currentUserToken');
  }
  
}
