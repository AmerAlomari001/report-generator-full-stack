import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReportService } from '../../serviecs/report.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  reports: any[] = [];

  constructor(private rs: ReportService, private router: Router) {}

  ngOnInit() {
    this.loadReports();
  }

  loadReports() {
    this.rs.getAll().subscribe((res: any[]) => {
      this.reports = res;
    }, err => {
      console.error('❌ Failed to load reports:', err);
    });
  }

  viewReport(report: any) {
  localStorage.setItem('selectedReport', JSON.stringify(report)); // 🆕
  this.router.navigate(['/report'], { state: { report } });
}


  getPdfUrl(pdfPath: string): string {
    return `${environment.apiUrl}${pdfPath}`;
  }
}
