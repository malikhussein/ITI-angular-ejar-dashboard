import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/statistics', pathMatch: 'full' },
  { path: 'statistics', loadComponent: () => import('./statistics/statistics.component').then(m => m.StatisticsComponent) },
  { path: 'new-users', loadComponent: () => import('./new-users/new-users.component').then(m => m.NewUsersComponent) },
  { path: 'new-products', loadComponent: () => import('./new-products/new-products.component').then(m => m.NewProductsComponent) },
  { path: 'all-users', loadComponent: () => import('./users/all-users.component').then(m => m.AllUsersComponent) },
  { path: 'all-products', loadComponent: () => import('./products/all-products.component').then(m => m.AllProductsComponent) },
  { path: 'all-process', loadComponent: () => import('./process/all-process.component').then(m => m.AllProcessComponent) },
  { path: 'all-categories', loadComponent: () => import('./categories/all-categories.component').then(m => m.AllCategoriesComponent) },
  { path: 'profile', loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent) },
];
