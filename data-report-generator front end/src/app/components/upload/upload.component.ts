import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CsvPreviewComponent } from '../csv-preview/csv-preview.component';
import { DataService } from '../../serviecs/data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CsvPreviewComponent, FormsModule],
  templateUrl: './upload.component.html'
})
export class UploadComponent {
  prompt = new FormControl('');
  uploadedSummary: any = null;
selectedFile: File | null = null;

  constructor(private data: DataService) {}

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;
    this.selectedFile = file;

    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext === 'csv') {
      this.data.parseCsvFile(file).then(summary => {
        this.uploadedSummary = summary;
      });
    } else if (ext === 'xlsx' || ext === 'xls') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const wb = XLSX.read(e.target.result, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(ws, { defval: '', raw: false }) as { [key: string]: any }[];

        const rowsPreview = data.slice(0, 10);

        let chartData: { label: string; value: number }[] = [];
        const numericColumn = data.length && Object.keys(data[0]).find(k => !isNaN(data[0][k]));

        if (numericColumn) {
          const counts: Record<string, number> = {};
          data.forEach((r: any) => counts[r[numericColumn]] = (counts[r[numericColumn]] || 0) + 1);
          chartData = Object.keys(counts).map(key => ({ label: key, value: counts[key] }));
        } else {
          chartData = [{ label: 'No numeric data', value: 0 }];
        }

        this.uploadedSummary = { rows: data, rowsPreview, chartData, chartTitle: numericColumn || 'Preview' };
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('Unsupported file type. Please upload CSV or Excel.');
    }
  }

 sendToAI() {
  if (!this.uploadedSummary || !this.prompt.value || !this.selectedFile) return;

  const formData = new FormData();
  formData.append('file', this.selectedFile);
  formData.append('prompt', this.prompt.value);

  this.data.generateReport(formData).subscribe({
    next: (res: any) => {
      alert('✅ Report generated. Check history.');
      console.log("✅ PDF URL:", res.pdfUrl);  // ← مهم للتأكد
    },
    error: (err) => {
      console.error(err);
      alert('❌ Failed to generate report');
    }
  });
}

}
