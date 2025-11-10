import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReportService } from '../../../serviecs/report.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-reports.component.html',
})
export class AdminReportsComponent implements OnInit {
  list: any[] = [];
  filter: 'pending' | 'approved' | 'rejected' | 'needs_change' | '' = '';
  loading = true;

  constructor(private rs: ReportService, private router: Router) {} // ✅ عدل هون

  ngOnInit() {
    this.reload();
  }

  // 🟢 تحميل جميع التقارير
  reload() {
    this.loading = true;
    this.rs.getAllAdmin().subscribe({
      next: (res: any[]) => {
        console.log('📊 Admin reports fetched:', res);
        this.list = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Failed to load admin reports:', err);
        this.loading = false;
      }
    });
  }

  // 🗑️ حذف تقرير
  delete(id: number) {
    if (!confirm('Are you sure you want to delete this report?')) return;

    this.rs.deleteAdminReport(id).subscribe({
      next: () => {
        this.list = this.list.filter((r) => r.id !== id);
        alert('✅ Report deleted successfully');
      },
      error: (err) => {
        console.error('❌ Error deleting report:', err);
        alert('Failed to delete report.');
      }
    });
  }

  // 📥 تحميل PDF
  getPdfUrl(pdfPath: string): string {
    return `${environment.apiUrl}${pdfPath}`;
  }

  // 👁️ عرض التفاصيل
  viewReport2(id: number) {
    this.rs.getById(id).subscribe({
      next: (report) => {
        console.log('✅ Navigating to admin report details:', report);
        this.router.navigate([`/admin/reports/${id}`], { state: { report } });
      },
      error: (err) => {
        console.error('❌ Failed to fetch report:', err);
        alert('Failed to open report details.');
      }
    });
  }
}
