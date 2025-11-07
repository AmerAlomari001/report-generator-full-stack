import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  // ✅ Parse CSV file into JSON + extract preview + generate chart data
  parseCsvFile(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results: Papa.ParseResult<any>) => {
          const rows: any[] = results.data;
          const rowsPreview = rows.slice(0, 10); 

          const numericColumn = rows.length 
            ? Object.keys(rows[0]).find(k => !isNaN(Number(rows[0][k])))
            : null;

          let chartData: { label: string; value: number }[] = [];

          if (numericColumn) {
            const counts: Record<string, number> = {};
            rows.forEach(r => {
              const key = r[numericColumn];
              counts[key] = (counts[key] || 0) + 1;
            });
            chartData = Object.keys(counts).map(key => ({
              label: key,
              value: counts[key]
            }));
          } else {
            chartData = [{ label: 'No numeric data', value: 0 }];
          }

          resolve({
            rows,
            rowsPreview,
            chartData,
            chartTitle: numericColumn || 'Preview'
          });
        },
        error: (err) => reject(err)
      });
    });
  }

generateReport(formData: FormData) {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.post(`${environment.apiUrl}/api/reports/generate`, formData, {
    headers
  });
}

}
