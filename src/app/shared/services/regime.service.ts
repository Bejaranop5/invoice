import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Regime } from 'src/app/types/Regime';
import { environment } from 'src/environments/environment.developer';

@Injectable({
  providedIn: 'root'
})
export class RegimeService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) {}

  getAllRegime(): Observable<any> {
    const url = `${this.apiUrl}Regimes`;
    return this.http.get<any>(url);
  }

  getRegimeById(id: number): Observable<any> {
    const url = `${this.apiUrl}Regimes/${id}`;
    return this.http.get<any>(url);
  }

  createOrUpdateRegime(Regime: Regime): Observable<any> {
    const url = `${this.apiUrl}Regimes`;
    return this.http.post<Regime>(url, Regime);
  }

  deleteRegimeById(id: number): Observable<any> {
    const url = `${this.apiUrl}Regimes/${id}`;
    return this.http.delete<any>(url);
  }
}
