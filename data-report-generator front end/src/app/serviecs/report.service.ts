import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Report } from '../models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = `${environment.apiUrl}/api/reports`;         // للمستخدم
  private adminUrl = `${environment.apiUrl}/api/admin/reports`;  // للأدمن

  constructor(private http: HttpClient) {}

  // ✅ تجهيز الهيدر مع التوكن
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    console.log('🔑 Sending token header:', token);

    return new HttpHeaders()
      .set('Authorization', `Bearer ${token || ''}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
  }

  // ✅ جلب كل التقارير للمستخدم
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/history`, {
      headers: this.getAuthHeaders()
    });
  }

  // ✅ جلب تقرير واحد حسب ID
  getById(id: number): Observable<Report> {
    console.log('📡 Fetching report ID:', id);
    return this.http.get<Report>(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // ✅ إضافة تقرير جديد
  add(report: Report): Observable<any> {
    return this.http.post(this.baseUrl, report, {
      headers: this.getAuthHeaders()
    });
  }

  // ✅ تحديث تقرير
  update(report: Report): Observable<any> {
    return this.http.put(`${this.baseUrl}/${report.id}`, report, {
      headers: this.getAuthHeaders()
    });
  }

  // ✅ حذف تقرير
  deleteReport(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // ✅ تقارير الأدمن
  getAllAdmin(): Observable<any[]> {
    return this.http.get<any[]>(this.adminUrl, {
      headers: this.getAuthHeaders()
    });
  }

  // ✅ حذف تقرير للأدمن
  deleteAdminReport(id: number): Observable<any> {
    return this.http.delete(`${this.adminUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // ✅ رابط تحميل PDF
  getReportPdf(pdfPath: string): string {
    return `${environment.apiUrl}${pdfPath}`;
  }
}
