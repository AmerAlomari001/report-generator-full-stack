import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = `${environment.apiUrl}/api/reports`;         // for users
  private adminUrl = `${environment.apiUrl}/api/admin/reports`;  // for admin

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ♻️ User
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/history`, {
      headers: this.getAuthHeaders()
    });
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  deleteReport(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // 👑 Admin
  getAllAdmin(): Observable<any[]> {
    return this.http.get<any[]>(this.adminUrl, {
      headers: this.getAuthHeaders()
    });
  }

  deleteAdminReport(id: number): Observable<any> {
    return this.http.delete(`${this.adminUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  getReportPdf(pdfPath: string): string {
    return `${environment.apiUrl}${pdfPath}`;
  }
}
