import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { DashboardService } from './dashboard.service';
import { SharedService } from '../../shared/services/shared.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexStroke,
  ApexXAxis,
  ApexYAxis,
  NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  plotOptions?: ApexPlotOptions;
  legend?: ApexLegend;
  colors?: string[];
  labels?: string[];
  grid?: ApexGrid;
  stroke: ApexStroke;
  activeFilter?: 'year' | 'month' | 'week';
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  public transactionChart: Partial<ChartOptions>;

  dashboardData : any;
  isReloadLoading = false;
 
  constructor(public sharedservice : SharedService , private dashboardservice : DashboardService){
    this.transactionChart = {
      series: [
        {
          name: 'Total Credit',
          data: [10, 12, 8, 20, 22, 115]
        }
      ],
      chart: {
        type: 'line',
        height: 300,
        width: '100%',
        toolbar: { show: false },
        zoom: { enabled: false },
        offsetX: 0,
        offsetY: 0
      },
      xaxis: {
        type: 'category',
        categories: ['28-12-2024', '29-12-2024', '30-12-2024', '31-12-2024', '01-01-2025', '01-03-2025']
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      colors: ['#1d68f1'],
      grid: {
        yaxis: {
          lines: {
            show: true
          }
        },
        strokeDashArray: 5
      },
      stroke: {
        curve: 'smooth'
      },
      activeFilter: 'week'
    };
  }

  ngOnInit(): void {
    this.sharedservice.givePermissionByUrl('/dashboard');
    this.loadDashboard();
  }

  loadDashboard(refresh = false): void {
    if (this.isReloadLoading) return;
    if (refresh) this.isReloadLoading = true;

    this.dashboardservice.superAdminDashboard().pipe(
      finalize(() => this.isReloadLoading = false)
    ).subscribe((res : any) => {
      this.dashboardData = res.data[0];
    });
  }
}
