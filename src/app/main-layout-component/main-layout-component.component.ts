import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout-component',
  imports: [
    RouterOutlet,
    SidebarComponent,
    HeaderComponent,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './main-layout-component.component.html',
  styleUrl: './main-layout-component.component.css',
})
export class MainLayoutComponentComponent {
  isSidebarCollapsed = false;

  toggleSidebar(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }
}
