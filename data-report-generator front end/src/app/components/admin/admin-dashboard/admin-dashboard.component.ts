import { Component, OnInit } from '@angular/core';
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
export class AdminDashboardComponent implements OnInit {
  total = 0;
  pending = 0;
  approved = 0;

  constructor(private rs: ReportService, private router: Router) {}

  ngOnInit() {
    this.rs.getAll().subscribe({
      next: (reports:any) => {
        this.total = reports.length;
        this.pending = reports.filter((r: any) => r.status === 'pending').length;
        this.approved = reports.filter((r: any) => r.status === 'approved').length;
      },
      error: (err:Error) => {
        console.error('❌ Error loading reports:', err);
      }
    });
  }

  goReports() {
    this.router.navigate(['/admin/reports']);
  }
}
