import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.developer';
import { Country } from 'src/app/types/Country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) {}

  getAllCountry(): Observable<any> {
    const url = `${this.apiUrl}Countries`;
    return this.http.get<any>(url);
  }

  getCountryById(id: number): Observable<any> {
    const url = `${this.apiUrl}Countries/${id}`;
    return this.http.get<any>(url);
  }

  createOrUpdateCountry(Country: Country): Observable<any> {
    const url = `${this.apiUrl}Countries`;
    return this.http.post<Country>(url, Country);
  }

  deleteCountryById(id: number): Observable<any> {
    const url = `${this.apiUrl}Countries/${id}`;
    return this.http.delete<any>(url);
  }
}
