import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ProcessService } from '../services/process.service';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';

@Component({
  imports: [NgxChartsModule],
  selector: 'app-dashboard',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  totalUsers: number = 0;
  totalProcess: number = 0;
  totalCatgories: number = 0;
  totalProducts: number = 0;
  totaldeals:number=0
  
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

  //all statics chart data
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


  // 
  advancedPieChartData: any[] = [
    { name: 'Computers', value: 300 },
    { name: 'Phones', value: 150 },
    { name: 'Cameras', value: 500 },
    { name: 'Headphones', value: 100 },
  ];
  // advancedPieView: [number, number] = [1500, 600]; // width, height

  pipeScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#FFADED', '#562DDD', '#7045FF', '#C768FF', '#B72A67'],
  };
  

  users: any[] = [];

  constructor(
    private userService: UserService,
    private processService: ProcessService ,
    private categoryService: CategoryService,
    private productService : ProductService
  ) {}

  ngOnInit(): void {
    this.fetchTotalUsers();
    this.fetchTotalProcess();
    this.fetchTotalCategories();
    this.fetchTotalProducts();
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
    this.processService.getAllProcesses().subscribe({
      next: (res) => {
        this.totalProcess = res.length;
        this.updateChartData();
        // this.totaldeals=res.data
      },
      error: (err) => console.error(err),
    });
  }

  fetchTotalCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        console.log(res);
        
        this.totalCatgories = res.length;
        this.updateChartData();
      },
      error: (err) => console.error(err),
    });
  }

  fetchTotalProducts(): void {
    this.productService.getallProducts().subscribe({
      next: (res) => {
        console.log(res);
        this.totalProducts = res.data.length;
              },
      error: (err) => console.error(err),
    });
  }
}
