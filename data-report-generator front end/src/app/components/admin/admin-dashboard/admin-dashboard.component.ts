import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReportService } from '../../serviecs/report.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  total = 0;
  pending = 0;
  approved = 0;

  constructor(private rs: ReportService, private router: Router) {
    const list = this.rs.getAll();
    this.total = list.length;
    this.pending = list.filter(r => r.status === 'pending').length;
    this.approved = list.filter(r => r.status === 'approved').length;
  }

  goReports() {
    this.router.navigate(['/admin/reports']);
  }
}
