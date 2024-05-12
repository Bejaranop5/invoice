import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.developer';
import { City } from 'src/app/types/City';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) {}

  getAllCity(): Observable<any> {
    const url = `${this.apiUrl}Cities`;
    return this.http.get<any>(url);
  }

  GetCitiestByDeparmentId(departmentId : number): Observable<any> {
    const url = `${this.apiUrl}Cities/GetCitiestByDeparmentId/${departmentId}`;
    return this.http.get<any>(url);
  }

  getCityById(id: number): Observable<any> {
    const url = `${this.apiUrl}Cities/${id}`;
    return this.http.get<any>(url);
  }

  createOrUpdateCity(City: City): Observable<any> {
    const url = `${this.apiUrl}Cities`;
    return this.http.post<City>(url, City);
  }

  deleteCityById(id: number): Observable<any> {
    const url = `${this.apiUrl}Cities/${id}`;
    return this.http.delete<any>(url);
  }
}
