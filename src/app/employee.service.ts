import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseURL = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any> {
    return this.http.get(`${this.baseURL}/employees`);
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}/employee/${id}`);
  }

  getEmployeesByName(name: string): Observable<any> {
    return this.http.get(`${this.baseURL}/employees/${name}`);
  }

  addEmployee(employee: Object): Observable<Object> {
    return this.http.post(`${this.baseURL}/addEmployee`, employee);
  }

  updateEmployee(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseURL}/employee/${id}`, value);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/employee/${id}`);
  }
}
