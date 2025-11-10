import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Report } from '../models/report.model';
@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = `${environment.apiUrl}/api/reports`;         // for users
  private adminUrl = `${environment.apiUrl}/api/admin/reports`;  // for admin

  constructor(private http: HttpClient) {}


  //  تجهيز الـ Headers مع التوكن

 private getAuthHeaders(): HttpHeaders {
  const token = localStorage.getItem('token');
  return new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
}



  

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/history`, {
      headers: this.getAuthHeaders()
    });
  }


  getByEmail(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/email/${email}`, {
      headers: this.getAuthHeaders()
    });
  }

  getLastReport(): Observable<any> {
    return this.http.get(`${this.baseUrl}/last`, {
      headers: this.getAuthHeaders()
    });
  }

 
 getById(id: number): Observable<Report> {
  return this.http.get<Report>(`${this.baseUrl}/${id}`, {
    headers: this.getAuthHeaders()
  });
}

  


  //  إضافة تقرير جديد
  add(report: Report): Observable<any> {
    return this.http.post(this.baseUrl, report, {
      headers: this.getAuthHeaders()
    });
  }

  update(report: Report): Observable<any> {
    return this.http.put(`${this.baseUrl}/${report.id}`, report, {
      headers: this.getAuthHeaders()
    });
  }

  

  deleteReport(id: number): Observable<any> {

    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }


  
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
