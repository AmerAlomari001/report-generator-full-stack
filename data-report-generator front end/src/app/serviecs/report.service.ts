import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Report } from '../models/report.model';
@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = `${environment.apiUrl}/api/reports`;

  constructor(private http: HttpClient) {}

  //  تجهيز الـ Headers مع التوكن
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAll(): Observable<Report> {
    return this.http.get(`${this.baseUrl}/history`, {
      headers: this.getAuthHeaders()
    });
  }

  getByEmail(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/email/${email}`, {
      headers: this.getAuthHeaders()
    });
  }

  getLastReport(): Observable<Report> {
    return this.http.get(`${this.baseUrl}/last`, {
      headers: this.getAuthHeaders()
    });
  }

  getById(id: number): Observable<Report> {
    return this.http.get(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  //  إضافة تقرير جديد
  add(report: Report): Observable<Report> {
    return this.http.post(this.baseUrl, report, {
      headers: this.getAuthHeaders()
    });
  }

  update(report: Report): Observable<Report> {
    return this.http.put(`${this.baseUrl}/${report.id}`, report, {
      headers: this.getAuthHeaders()
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  getReportPdf(pdfPath: string): string {
    return `${environment.apiUrl}${pdfPath}`;
  }
}
