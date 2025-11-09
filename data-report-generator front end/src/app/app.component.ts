import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from './serviecs/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false
})
export class AppComponent {  title = 'data-report-generator2';

   constructor(public router: Router, public auth: AuthService) {}

  logout() {
    this.auth.logout();        // 🟢 تحذف التوكن وبيانات اليوزر
    this.router.navigate(['/login']); // ⚡️ توجه للصفحة Login
  }
}
