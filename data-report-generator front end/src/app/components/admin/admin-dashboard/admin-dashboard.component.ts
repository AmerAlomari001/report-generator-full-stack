import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../../serviecs/report.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent implements OnInit {
  total = 0;
  pending = 0;
  approved = 0;
  rejected = 0;
  loading = true;

  constructor(private rs: ReportService, private router: Router) {}

  ngOnInit() {
    this.rs.getAll().subscribe((reports: any[]) => {
      this.total = reports.length;
      this.pending = reports.filter(r => r.status === 'pending').length;
      this.approved = reports.filter(r => r.status === 'approved').length;
      this.rejected = reports.filter(r => r.status === 'rejected').length;
      this.loading = false;
    });
  }

  goToReports() {
    this.router.navigate(['/admin/reports']);
  }

   goToUsers() {
    this.router.navigate(['/admin/users']);
  }
}
