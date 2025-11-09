import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChartComponent } from '../chart/chart.component';
import { ReportService } from '../../serviecs/report.service';
import { MarkdownModule } from 'ngx-markdown';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, MarkdownModule, ChartComponent],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  report: any = null;
  reportText = '';
  pdfUrl = '';
  loading = true;

  constructor(private rs: ReportService, private router: Router) {}

  ngOnInit(): void {
       
    this.loading = true;

    const navigation = this.router.getCurrentNavigation();
    const reportFromState = navigation?.extras?.state?.['report'];

    if (reportFromState) {
      console.log('📌 Loaded from Router State:', reportFromState);
      this.setupReportView(reportFromState);
      return;
    }

    const savedReport = localStorage.getItem('selectedReport');
    if (savedReport) {
      const report = JSON.parse(savedReport);
      console.log('📌 Loaded from LocalStorage:', report);
      this.setupReportView(report);
      return;
    }

    alert('⚠️ No report found. Please return from History page.');
    this.router.navigate(['/history']);
  }

  setupReportView(report: any) {
     setTimeout(() => {
      this.report = report;
      this.reportText = report.report;
      this.pdfUrl = this.rs.getReportPdf(report.pdf_path);
      console.log('✅ PDF URL:', this.pdfUrl);

      localStorage.setItem('selectedReport', JSON.stringify(report));
console.log("📊 Chart Data received:", report.chartData);

      this.loading = false;
    }, 1000);
  }

  downloadPDF() {
    const doc = new jsPDF();
    doc.text(this.reportText || '', 10, 10);
    doc.save(`report_${Date.now()}.pdf`);
  }

  goBack() {
    this.router.navigate(['/history']);
  }
}
