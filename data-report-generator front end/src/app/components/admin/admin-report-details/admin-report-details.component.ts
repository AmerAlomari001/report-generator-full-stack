import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../../serviecs/report.service';
import { Report } from '../../../models/report.model';
import { AuthService } from '../../../serviecs/auth.service';

@Component({
  selector: 'app-admin-report-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-report-details.component.html',
})
export class AdminReportDetailsComponent implements OnInit {
  report: Report | null = null;
  note = '';
  isAdmin = false;
  loading: boolean | undefined;

  constructor(
    private route: ActivatedRoute,
    private rs: ReportService,
    private router: Router,
    private auth: AuthService
  ) {}

 ngOnInit() {
  const nav = this.router.getCurrentNavigation();
  const stateReport = nav?.extras?.state?.['report'];

  if (stateReport) {
    this.report = stateReport;
    this.loading = false;
    return;
  }

  const id = Number(this.route.snapshot.paramMap.get('id'));
  if (id) {
    this.rs.getById(id).subscribe({
      next: (r) => {
        this.report = r;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Failed to load report:', err);
        this.router.navigate(['/admin/reports']);
      }
    });
  }
}

  back() {
    this.router.navigate(['/admin/reports']);
  }

  requestChange() {
    if (!this.report) return;
    this.report.status = 'needs_change';
    this.report.note = this.note;
    this.rs.update(this.report);
    this.back();
  }

  deleteReport() {
    if (!this.report || !this.isAdmin) return;
    this.rs.deleteAdminReport(this.report.id);
    this.back();
  }
}
