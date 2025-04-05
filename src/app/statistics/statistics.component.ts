import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ProcessService } from '../services/process.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  totalUsers: number = 0;
  totalProcess: number = 0;

  users: any[] = [];

  constructor(private userService: UserService, private processService:ProcessService) {}

  ngOnInit(): void {
    this.fetchTotalUsers();
    this.fetchTotalProcess();
  }

  fetchTotalUsers(): void {
    this.userService.getTotalUsers().subscribe({
      next: (res) =>this.totalUsers=res.users.length,
      error: (err) => console.error(err),
    });
  }

  fetchTotalProcess(): void {
    this.processService.getTotalProcess().subscribe({
      next: (res) =>this.totalUsers=res.processes.length,
      error: (err) => console.error(err),
    });
  }



}
