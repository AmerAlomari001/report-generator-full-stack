import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../serviecs/report.service';
import { Report } from '../../models/report.model';
import { AuthService } from '../../serviecs/auth.service';

@Component({
  selector: 'app-admin-report-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-report-details.component.html',
  styleUrls: ['./admin-report-details.component.scss']
})
export class AdminReportDetailsComponent implements OnInit {
  report: Report | null = null;
  note = '';
  isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private rs: ReportService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.report =
      nav?.extras?.state?.['report'] ||
      this.rs.getById(Number(this.route.snapshot.paramMap.get('id')));

    this.isAdmin = this.auth.isAdmin(); // التحقق من الدور
  }

  back() {
    this.router.navigate(['/admin/reports']);
  }

  requestChange() {
    if (!this.report) return;
    this.report.status = 'needs_change';
    this.report.adminNote = this.note;
    this.rs.update(this.report);
    this.back();
  }

  deleteReport() {
    if (!this.report || !this.isAdmin) return;
    this.rs.delete(this.report.id);
    this.back();
  }
}
