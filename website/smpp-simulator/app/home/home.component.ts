import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, BaseChartDirective } from 'ng2-charts';
const COLORSET: Color[] = [
  {
    // grey
    backgroundColor: 'rgba(148,159,177,0.2)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)',
  },
  {
    // dark grey
    backgroundColor: 'rgba(77,83,96,0.2)',
    borderColor: 'rgba(77,83,96,1)',
    pointBackgroundColor: 'rgba(77,83,96,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(77,83,96,1)',
  },
  {
    // red
    backgroundColor: 'rgba(255,0,0,0.3)',
    borderColor: 'red',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)',
  },
  {
    // green
    backgroundColor: 'rgba(0,0,255, 0.3)',
    borderColor: 'none',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)',
  },
];
@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  lineChartColors: Color[] = [];

  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  @ViewChild(BaseChartDirective, { static: true }) chart?: BaseChartDirective;

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    this.generateFakeData();
  }

  generateFakeData(): void {
    // generate sample rate per window
    const sampleLength = [...Array(24).keys()];
    this.lineChartLabels = sampleLength.map(i => String(i).padStart(2, '0'));
    this.lineChartData.push({
      data: sampleLength.map(() => this.getRandomArbitrary(0, 100)),
      label: 'Throughput',
    });
    this.lineChartColors.push(COLORSET[0]);
    this.updateChart();
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  updateChart(): void {
    if (this.chart) {
      this.chart.update();
    }
  }
  timeShift(): void {
    const idx = this.lineChartData.length;
    const series = Object.assign([], <any[]>this.lineChartData[idx - 1]?.data);
    series.push(series.shift());
    this.lineChartData.push({ data: series, label: `Time Shift #${idx}` });
    this.lineChartColors.push(COLORSET[2]);
    this.updateChart();
  }

  reduce(): void {
    const series = Object.assign([], <number[]>this.lineChartData[0]?.data);
    const ratio = this.getRandomArbitrary(70, 100) / 100;
    this.lineChartData.push({ data: series.map(i => ratio * i), label: 'Reduced' });
    this.lineChartColors.push(COLORSET[2]);
    this.updateChart();
  }

  speedVary(): void {
    const minRatio = 0.7;
    const maxRatio = 1.3;

    const series = Object.assign([], <number[]>this.lineChartData[0]?.data);
    this.lineChartData.push({ data: series.map(i => maxRatio * i), label: 'Max' });
    this.lineChartColors.push(COLORSET[0]);
    this.lineChartData.push({ data: series.map(i => minRatio * i), label: 'Min' });
    this.lineChartColors.push(COLORSET[0]);
    this.lineChartData.push({ data: series.map(i => (this.getRandomArbitrary(70, 130) / 100) * i), label: 'Speed Vary' });
    this.lineChartColors.push(COLORSET[2]);
    this.updateChart();
  }

  getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  reset(): void {
    this.lineChartData = [];
    this.lineChartColors = [];
    this.generateFakeData();
  }
}
