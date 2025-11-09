import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../serviecs/report.service';

@Component({
  selector: 'app-admin-report-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-report-details.component.html',
  styleUrls: ['./admin-report-details.component.scss']
})
export class AdminReportDetailsComponent implements OnInit {
  report: any;
  note = '';

  constructor(
    private route: ActivatedRoute,
    private rs: ReportService,
    private router: Router
  ) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.report =
      nav?.extras?.state?.['report'] ||
      this.rs.getById(Number(this.route.snapshot.paramMap.get('id')));
  }

  back() {
    this.router.navigate(['/admin/reports']);
  }

  approve() {
    this.report.status = 'approved';
    this.rs.update(this.report);
    this.back();
  }

  reject() {
    this.report.status = 'rejected';
    this.rs.update(this.report);
    this.back();
  }

  requestChange() {
    this.report.status = 'needs_change';
    this.report.adminNote = this.note;
    this.rs.update(this.report);
    this.back();
  }
}
