import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AppUser {
  _id?: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userKey = 'currentUser';
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  // 🟢 تسجيل مستخدم جديد
  signup(payload: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/user/register`, payload);
  }

  // 🟢 تسجيل الدخول
  login(email: string, password: string): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/api/user/login`, { email, password })
      .pipe(
        tap((res: any) => {
          if (res?.token) {
            // نخزن البيانات في localStorage
            localStorage.setItem(this.tokenKey, res.token);
            localStorage.setItem(this.userKey, JSON.stringify(res.user));

            // في حال الـ backend ما رجع role، نحط user افتراضيًا
            localStorage.setItem('role', res.user.role || 'user');
          }
        })
      );
  }

  // 🟠 تسجيل خروج
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    localStorage.removeItem('role');
  }

  // 🟣 الحصول على التوكن
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // 🟣 الحصول على المستخدم الحالي
  getCurrentUser(): AppUser | null {
    const data = localStorage.getItem(this.userKey);
    return data ? JSON.parse(data) : null;
  }

  // 🟣 الحصول على الدور
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // 🟣 التحقق من تسجيل الدخول
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // 🟣 التحقق من كون المستخدم أدمن
  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }
}
