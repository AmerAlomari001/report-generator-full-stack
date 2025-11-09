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
    console.log("📋 Reports fetched from backend:", res);
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


 deleteReport(id: number) {
  if (!confirm('Are you sure you want to delete this report?')) return;

  this.rs.deleteReport(id).subscribe({
    next: () => {
      // 🧹 احذف من الواجهة مباشرة بدون إعادة تحميل كامل
      this.reports = this.reports.filter(r => r.id !== id);
      alert('✅ Report deleted successfully');
    },
    error: (err) => {
      if (err.status === 403) {
        alert('⚠️ You are not authorized to delete this report.');
      } else if (err.status === 404) {
        alert('⚠️ Report not found.');
      } else {
        alert('❌ Failed to delete the report. Please try again later.');
      }
      console.error('❌ Error in deleteReport():', err);
    }
  });

  }


  getPdfUrl(pdfPath: string): string {
    return `${environment.apiUrl}${pdfPath}`;
  }
}
