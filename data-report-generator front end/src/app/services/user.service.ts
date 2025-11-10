import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${environment.apiUrl}/api/admin/users`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ✅ جلب كل المستخدمين
  getAllUsers(): Observable<any> {
    return this.http.get(this.baseUrl, {
      headers: this.getAuthHeaders()
    });
  }

  // ✅ تعديل دور المستخدم
  updateRole(id: number, role: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/role/${id}`, { role }, {
      headers: this.getAuthHeaders()
    });
  }

  // ✅ حذف مستخدم (اختياري)
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
