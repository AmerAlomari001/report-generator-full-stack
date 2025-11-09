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
  auth: any;

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

  viewReport(id:number){
  const r = this.rs.getById(id);
  if (!r) return;
  const user = this.auth.currentUser();
  if (user?.role === 'admin') {
    // ادمن يروح لمنطقة الادمن
    this.router.navigate(['/admin/reports', id], { state: { report: r } });
  } else {
    // يوزر عادي يروح للعرض العادي
    localStorage.setItem('selectedReport', JSON.stringify(r));
    this.router.navigate(['/report', id], { state: { report: r } });
  }
}


  getPdfUrl(pdfPath: string): string {
    return `${environment.apiUrl}${pdfPath}`;
  }
}
