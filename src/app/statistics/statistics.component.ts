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
  totalCatgories: number = 0;
  totalProducts: number = 0;
  totaldeals:number=0
  FinishedProcess:any[] = [];
  PendingProcess:any[] = [];
  totalFinishedProcess:number=0
  totalPendingProcess:number=0
  totalDailyCosts:any[] = [];
  lastFourProcesses:any[] = [];
  
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
      { name: 'Processes', value: this.totalFinishedProcess },
      { name: 'Products', value: this.totalProducts },
      { name: 'Categories', value: this.totalCatgories },
      // { name: 'Deals', value: this.totaldeals }, // optional if you fetch totaldeals
    ];
  }

lineView: [number, number] = [400, 200];
  


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
        this.totalUsers = res.users.length
      },
      error: (err) => console.error(err),
    });
  }

  fetchTotalProcess(): void {
    this.processService.getAllProcesses().subscribe({
      next: (res) => {
        console.log(res);
        
        this.FinishedProcess = res.filter((item)=>item.status=="finished");
        this.PendingProcess= res.filter((item)=>item.status=="pending")
        this.totalDailyCosts = res.reduce((total, item) => total + item.price, 0);
        console.log(this.totalDailyCosts);
        this.lastFourProcesses = res.slice(-4).reverse();
        console.log(this.lastFourProcesses);
        
          
        
        this.totalFinishedProcess=this.FinishedProcess.length
        this.totalPendingProcess=this.PendingProcess.length

      },
      error: (err) => console.error(err),
    });
  }

  fetchTotalCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        console.log(res);

        this.totalCatgories = res.length;
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

  generateMessage(proc: any): string {

      switch (proc.status) {
        case 'finished':
          return `Process for "${proc.productId?.name}" has completed under ${proc.renterId?.userName || 'Uncategorized'}.`;
        case 'canceled':
          return `Process "${proc.productId?.name}" was canceled from ${proc.renterId?.userName || 'Uncategorized'}.`;
        case 'pending':
          return `New process "${proc.productId?.name}" was pending from ${proc.renterId?.userName || 'Uncategorized'}.`;
          case 'in progress':
            return `New process "${proc.productId?.name}" was in progress from ${proc.renterId?.userName || 'Uncategorized'}.`;
  
        default:
          return `Process "${proc.productId?.name}" status is unknown.`;
      }  
  
    }
  }