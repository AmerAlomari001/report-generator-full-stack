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
    localStorage.setItem('selectedReport', JSON.stringify(report));
    this.router.navigate(['/report'], { state: { report } });
  }

  deleteReport(id: number) {
    if (confirm('Are you sure you want to delete this report?')) {
      this.rs.delete(id).subscribe(
        () => {
          alert('✅ Report deleted successfully');
          this.loadReports(); // إعادة تحميل القائمة بعد الحذف
        },
        (error) => {
          console.error('❌ Error deleting report:', error);
          alert('Failed to delete the report.');
        }
      );
    }
  }

  getPdfUrl(pdfPath: string): string {
    return `${environment.apiUrl}${pdfPath}`;
  }
}
