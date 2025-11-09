import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';


import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';


Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  PieController,
  ArcElement,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  template: `
    <div *ngIf="chartSummary" class="container py-5">
      <div class="card shadow p-4">
        <h2 class="text-center mb-4">{{ chartSummary.chartTitle }}</h2>

        <div class="row">
          <div class="col-md-6 mb-4">
            <canvas
              baseChart
              [data]="barChartData"
              [options]="barChartOptions"
              [type]="'bar'"
            ></canvas>
          </div>

          <div class="col-md-6 mb-4">
            <canvas
              baseChart
              [data]="pieChartData"
              [options]="pieChartOptions"
              [type]="'pie'"
            ></canvas>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ChartComponent implements OnInit {
  private _chartSummary: any;

  @Input() set chartSummary(value: any) {
    this._chartSummary = value;
    if (value) this.updateCharts();
  }

  get chartSummary() {
    return this._chartSummary;
  }

  barChartData!: ChartData<'bar'>;
  barChartOptions: ChartOptions<'bar'> = { responsive: true };

  pieChartData!: ChartData<'pie'>;
  pieChartOptions: ChartOptions<'pie'> = { responsive: true };

  ngOnInit() {}

  updateCharts() {
    if (!this._chartSummary?.chartData || !this._chartSummary.chartData.length) {
      this.barChartData = {
        labels: ['No Data'],
        datasets: [{ data: [0], label: 'No Data' }],
      };
      this.pieChartData = {
        labels: ['No Data'],
        datasets: [{ data: [0], label: 'No Data' }],
      };
      return;
    }

    const labels = this._chartSummary.chartData.map((d: any) => d.label);
    const data = this._chartSummary.chartData.map((d: any) => d.value);

    this.barChartData = {
      labels,
      datasets: [{ data, label: this._chartSummary.chartTitle }],
    };

    this.pieChartData = {
      labels,
      datasets: [{ data, label: this._chartSummary.chartTitle }],
    };
  }
}
