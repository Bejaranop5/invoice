import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.developer';
import { Department } from 'src/app/types/Department';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) {}

  getAllDepartment(): Observable<any> {
    const url = `${this.apiUrl}Departments`;
    return this.http.get<any>(url);
  }

  GetDepartmentByCountryId(countryId : number): Observable<any> {
    const url = `${this.apiUrl}Departments/GetDepartmentByCountryId/${countryId}`;
    return this.http.get<any>(url);
  }

  getDepartmentById(id: number): Observable<any> {
    const url = `${this.apiUrl}Departments/${id}`;
    return this.http.get<any>(url);
  }

  createOrUpdateDepartment(Department: Department): Observable<any> {
    const url = `${this.apiUrl}Departments`;
    return this.http.post<Department>(url, Department);
  }

  deleteDepartmentById(id: number): Observable<any> {
    const url = `${this.apiUrl}Departments/${id}`;
    return this.http.delete<any>(url);
  }
}
