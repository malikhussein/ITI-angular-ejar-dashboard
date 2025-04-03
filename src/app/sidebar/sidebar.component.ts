import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  LogoImage = 'assets/images/logo.png';
  isCollapsed = false;

  @Output() sidebarToggled = new EventEmitter<boolean>();

  menuItems = [
    { path: '/statistics', label: 'Statistics', icon: 'fas fa-chart-bar' },
    { path: '/new-users', label: 'New Users', icon: 'fas fa-user-plus' },
    { path: '/new-products', label: 'New Products', icon: 'fas fa-box-open' },
    { path: '/all-users', label: 'Users', icon: 'fas fa-users' },
    { path: '/all-products', label: 'Products', icon: 'fas fa-boxes' },
    { path: '/all-process', label: 'Processes', icon: 'fas fa-tasks' },
    { path: '/all-categories', label: 'Categories', icon: 'fas fa-tags' },
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggled.emit(this.isCollapsed);
  }
}
