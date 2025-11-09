import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = `${environment.apiUrl}/api/reports`;

  constructor(private http: HttpClient) {}

  // 🔐 تجهيز الـ Headers مع التوكن
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // 🟢 جلب كل التقارير
  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/history`, {
      headers: this.getAuthHeaders()
    });
  }

  // 🟢 جلب تقرير حسب الإيميل
  getByEmail(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/email/${email}`, {
      headers: this.getAuthHeaders()
    });
  }

  // 🟢 جلب آخر تقرير
  getLastReport(): Observable<any> {
    return this.http.get(`${this.baseUrl}/last`, {
      headers: this.getAuthHeaders()
    });
  }

  // 🟢 جلب تقرير حسب الـ ID
  getById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // 🟡 إضافة تقرير جديد
  add(report: any): Observable<any> {
    return this.http.post(this.baseUrl, report, {
      headers: this.getAuthHeaders()
    });
  }

  // 🔵 تعديل تقرير موجود
  update(report: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${report.id}`, report, {
      headers: this.getAuthHeaders()
    });
  }

  // 🔴 حذف تقرير
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // 📄 عرض ملف الـ PDF الخاص بالتقرير
  getReportPdf(pdfPath: string): string {
    return `${environment.apiUrl}${pdfPath}`;
  }
}
