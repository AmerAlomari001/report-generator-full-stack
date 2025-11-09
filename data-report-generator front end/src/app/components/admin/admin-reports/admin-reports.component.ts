import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReportService } from '../../../serviecs/report.service';

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-reports.component.html'
})
export class AdminReportsComponent implements OnInit {
  list: any[] = [];

  constructor(private rs: ReportService) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.rs.getAllAdmin().subscribe((res: any[]) => {
      this.list = res;
    });
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this report?')) {
this.rs.deleteAdminReport(id).subscribe(() => this.reload());
    }
  }
}
