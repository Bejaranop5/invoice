import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.developer';
import { LoginRequest } from 'src/app/types/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) {}
  
  Login(login: LoginRequest): Observable<any> {
    const url = `${this.apiUrl}Login`;
    return this.http.post<LoginRequest>(url, login);
  }
}
