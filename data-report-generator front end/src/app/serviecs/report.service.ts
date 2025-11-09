import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = `${environment.apiUrl}/api/reports`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    console.log("🔍 Token being sent from Angular:", token);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAll(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/history`, { headers });
  }

  getByEmail(email: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/email/${email}`, { headers });
  }

 getLastReport(): Observable<any> {
  const headers = this.getAuthHeaders();
  return this.http.get(`${this.baseUrl}/last`, { headers });
}

delete(id: number): Observable<any> {
  const headers = this.getAuthHeaders();
  return this.http.delete(`${this.baseUrl}/${id}`, { headers });
}


  getReportPdf(pdfPath: string): string {
    return `${environment.apiUrl}${pdfPath}`;
  }
}
