import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../serviecs/report.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.scss']
})
export class AdminReportsComponent implements OnInit {
  list: any[] = [];
  filter = '';

  constructor(private rs: ReportService, private router: Router) {}

  ngOnInit() {
    this.list = this.rs.getAll();
  }

  get listFiltered() {
    if (!this.filter) return this.list;
    return this.list.filter(r => r.status === this.filter);
  }

  view(r: any) {
    this.router.navigate(['/admin/reports', r.id], { state: { report: r } });
  }

  approve(r: any) {
    r.status = 'approved';
    this.rs.update(r);
    this.list = this.rs.getAll();
  }

  reject(r: any) {
    r.status = 'rejected';
    this.rs.update(r);
    this.list = this.rs.getAll();
  }
}
