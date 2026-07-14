import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ChartOptions } from '../dashboard/dashboard.component';
import { SharedService } from '../../shared/services/shared.service';
import { LeadDashboardService } from './lead-dashboard.service';

@Component({
  selector: 'app-lead-dashboard',
  templateUrl: './lead-dashboard.component.html',
  styleUrl: './lead-dashboard.component.scss'
})
export class LeadDashboardComponent {

  public statusWiseLeadChart: Partial<ChartOptions>;
  public sourceWiseLeadChart: Partial<ChartOptions>;
  public transactionChart: Partial<ChartOptions>;

  dashboardData : any;
  isReloadLoading = false;
 
  constructor(public sharedservice : SharedService , private leaddashboardservice : LeadDashboardService){
  }

  ngOnInit(): void {
    this.sharedservice.givePermissionByUrl('/lead-dashboard');
    this.loadDashboard();
  }

  loadDashboard(refresh = false): void {
    if (this.isReloadLoading) return;
    if (refresh) this.isReloadLoading = true;

    this.leaddashboardservice.superAdminDashboard().pipe(
      finalize(() => this.isReloadLoading = false)
    ).subscribe((res : any) => {
      this.dashboardData = res.data[0];
      this.buildCharts();
    });
  }

  private buildCharts(): void {
    this.statusWiseLeadChart = {
      series: [
        {
          name: 'basic',
          data: this.dashboardData?.statusWiseChart
        }
      ],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadiusApplication: 'end',
          borderRadius: 10
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [
          'New',
          'Contacted',
          'Proposal Sent',
          'Won',
          'On Hold',
          'Lost'
        ]
      },
      colors: ['#1d68f1'],
      grid: {
        show: true,
        borderColor: '#e5e5e5'
      }
    };
    this.sourceWiseLeadChart = {
      series: [
        {
          name: 'basic',
          data: this.dashboardData?.sourceWiseChart
        }
      ],
      chart: {
        type: 'bar',
        height: 550
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadiusApplication: 'end',
          borderRadius: 10
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [
          'Cold Calling / Telemarketing',
          'Direct',
          'Email Marketing',
          'Expo / Seminar',
          'Google',
          'Other',
          'Reference',
          'Social Media',
          'Website',
          'Digital Marketing'
        ]
      },
      colors: ['#1d68f1'],
      grid: {
        show: true,
        borderColor: '#e5e5e5'
      }
    };
  }
}
