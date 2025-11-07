import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-csv-preview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './csv-preview.component.html',
  styleUrls: ['./csv-preview.component.scss']
})
export class CsvPreviewComponent {
  @Input() rows: { [key: string]: any }[] = [];

  // كل الأعمدة الموجودة في أي صف
  get headers(): string[] {
    if (!this.rows || !this.rows.length) return [];
    const allKeys = new Set<string>();
    this.rows.forEach(row => Object.keys(row).forEach(k => allKeys.add(k)));
    return Array.from(allKeys);
  }
}
