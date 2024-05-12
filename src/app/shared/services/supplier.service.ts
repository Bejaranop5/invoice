import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.developer';
import { Supplier } from 'src/app/types/Supplier';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) {}

  getAllSupplier(): Observable<any> {
    const url = `${this.apiUrl}Suppliers`;
    return this.http.get<any>(url);
  }

  getSupplierById(id: number): Observable<any> {
    const url = `${this.apiUrl}Suppliers/${id}`;
    return this.http.get<any>(url);
  }

  createOrUpdateSupplier(Supplier: Supplier): Observable<any> {
    const url = `${this.apiUrl}Suppliers`;
    return this.http.post<Supplier>(url, Supplier);
  }

  deleteSupplierById(id: number): Observable<any> {
    const url = `${this.apiUrl}Suppliers/${id}`;
    return this.http.delete<any>(url);
  }
}
