import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../envronments/envronment';
import { Employee } from '../../shared/models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  private readonly getSubDomain =`${environment.scheme}${environment.apiUrl}/employee`;
  constructor(private http: HttpClient) {
  }

  getAll(name?: string) {
    return this.http.get<Employee[]>(this.getSubDomain + (name ? `?name=${name}` : ''));
  }

  create(data: Employee) {
    return this.http.post(this.getSubDomain, data);
  }

  update(id: number, data: Employee) {
    return this.http.put(`${this.getSubDomain}/${id}`, data);
  }

  getById(id:number){
    return this.http.get<Employee[]>(`${this.getSubDomain}/${id}`)
  }

  delete(id: number) {
    return this.http.delete(`${this.getSubDomain}/${id}`);
  }
  
}
