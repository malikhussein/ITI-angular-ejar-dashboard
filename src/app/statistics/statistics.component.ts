import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ProcessService } from '../services/process.service';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

@Component({
  imports: [NgxChartsModule],
  selector: 'app-dashboard',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  totalUsers: number = 0;
  totalProcess: number = 0;
  //user line chart data
  userLineChartData = [
    {
      name: 'Users',
      series: [
        { name: 'day1', value: 10 },
        { name: 'day2', value: 20 },
        { name: 'day3', value: 25 },
        { name: 'day4', value: 40 },
        { name: 'day5', value: 35 },
        { name: 'day6', value: 50 },
        { name: 'day7', value: 55 },
      ],
    },
  ];
  userView: [number, number] = [300, 200];

  //chart data
  // Sample data for the chart
  chartData: any[] = [
    { name: 'Users', value: 800 },
    { name: 'Processes', value: 150 },
    { name: 'Products', value: 500 },
    { name: 'Categories', value: 100 },
    { name: 'Costs', value: 600 },
  ];

  view: [number, number] = [1500, 600]; // width, height
  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#FFADED', '#562DDD', '#7045FF', '#C768FF', '#B72A67'],
  };
  // Show labels on the pie chart
  updateChartData(): void {
    this.chartData = [
      { name: 'Users', value: this.totalUsers },
      { name: 'Processes', value: this.totalProcess },
      { name: 'Products', value: 500 },
      { name: 'Categories', value: 8 },
      { name: 'Costs', value: 1200 },
    ];
  }

  users: any[] = [];

  constructor(
    private userService: UserService,
    private processService: ProcessService
  ) {}

  ngOnInit(): void {
    this.fetchTotalUsers();
    this.fetchTotalProcess();
  }

  fetchTotalUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        (this.totalUsers = res.users.length), this.updateChartData();
      },
      error: (err) => console.error(err),
    });
  }

  fetchTotalProcess(): void {
    this.processService.getTotalProcess().subscribe({
      next: (res) => {
        this.totalUsers = res.processes.length;
        this.updateChartData();
      },
      error: (err) => console.error(err),
    });
  }
}
