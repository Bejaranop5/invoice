import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.developer';
import { User } from 'src/app/types/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) {}

  getAllUser(): Observable<any> {
    const url = `${this.apiUrl}Users`;
    return this.http.get<any>(url);
  }

  getUserById(id: number): Observable<any> {
    const url = `${this.apiUrl}Users/${id}`;
    return this.http.get<any>(url);
  }

  createOrUpdateUser(User: User): Observable<any> {
    const url = `${this.apiUrl}Users`;
    return this.http.post<User>(url, User);
  }

  deleteUserById(id: number): Observable<any> {
    const url = `${this.apiUrl}Users/${id}`;
    return this.http.delete<any>(url);
  }
}
