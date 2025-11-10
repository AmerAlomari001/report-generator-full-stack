import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReportService } from '../../../serviecs/report.service';
import { UserService } from '../../../serviecs/user.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent implements OnInit {
  totalReports = 0;
  totalUsers = 0;
  loading = true;

  constructor(
    private rs: ReportService,
    private us: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    // 🔹 جلب عدد التقارير
    this.rs.getAllAdmin().subscribe({
      next: (reports: any[]) => {
        this.totalReports = reports.length; // 🧮 العدد الكلي
      },
      error: (err) => {
        console.error('❌ Failed to load reports:', err);
        this.totalReports = 0;
      }
    });

    // 🔹 جلب عدد المستخدمين
    this.us.getAllUsers().subscribe({
      next: (users: any[]) => {
        this.totalUsers = users.length;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Failed to load users:', err);
        this.totalUsers = 0;
        this.loading = false;
      }
    });
  }

  goToReports() {
    this.router.navigate(['/admin/reports']);
  }

  goToUsers() {
    this.router.navigate(['/admin/users']);
  }
}
