import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../../serviecs/report.service';
import { UserService } from '../../../serviecs/user.service'; // فرضاً

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent implements OnInit {
  totalReports = 0;
  totalUsers = 0;
  loading = true;

  constructor(
    private rs: ReportService,
    private us: UserService, // خدمة المستخدمين
    private router: Router
  ) {}

  ngOnInit() {
    // جلب عدد التقارير
    this.rs.getAll().subscribe({ 
      next: (reports: any[]) => {
        this.totalReports = reports.length;
      },
      error: () => this.totalReports = 0
    });

    // جلب عدد المستخدمين
    this.us.getAll().subscribe({ 
      next: (users: any[]) => {
        this.totalUsers = users.length;
        this.loading = false;
      },
      error: () => {
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
