import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/types/Profile';
import { environment } from 'src/environments/environment.developer';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) {}

  getAllProfile(): Observable<any> {
    const url = `${this.apiUrl}Profiles`;
    return this.http.get<any>(url);
  }

  getProfileById(id: number): Observable<any> {
    const url = `${this.apiUrl}Profiles/${id}`;
    return this.http.get<any>(url);
  }

  createOrUpdateProfile(Profile: Profile): Observable<any> {
    const url = `${this.apiUrl}Profiles`;
    return this.http.post<Profile>(url, Profile);
  }

  deleteProfileById(id: number): Observable<any> {
    const url = `${this.apiUrl}Profiles/${id}`;
    return this.http.delete<any>(url);
  }
}
