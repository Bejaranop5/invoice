import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.developer';
import { Client } from 'src/app/types/Client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) {}

  getAllClient(): Observable<any> {
    const url = `${this.apiUrl}Clients`;
    return this.http.get<any>(url);
  }

  getClientById(id: number): Observable<any> {
    const url = `${this.apiUrl}Clients/${id}`;
    return this.http.get<any>(url);
  }

  GetClientByUser(id: number): Observable<any> {
    const url = `${this.apiUrl}Clients/GetClientByUser/${id}`;
    return this.http.get<any>(url);
  }

  createOrUpdateClient(Client: Client): Observable<any> {
    const url = `${this.apiUrl}Clients`;
    return this.http.post<Client>(url, Client);
  }

  deleteClientById(id: number): Observable<any> {
    const url = `${this.apiUrl}Clients/${id}`;
    return this.http.delete<any>(url);
  }
}
