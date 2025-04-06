import { Routes } from '@angular/router';
import { UserListComponent } from './admin/users/user-list/user-list.component';
import { UserDetailComponent } from './admin/users/user-detail/user-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/statistics', pathMatch: 'full' },
  {
    path: 'statistics',
    loadComponent: () =>
      import('./statistics/statistics.component').then(
        (m) => m.StatisticsComponent
      ),
  },
  {
    path: 'new-users',
    loadComponent: () =>
      import('./new-users/new-users.component').then(
        (m) => m.NewUsersComponent
      ),
  },
  {
    path: 'new-products',
    loadComponent: () =>
      import('./new-products/new-products.component').then(
        (m) => m.NewProductsComponent
      ),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./users/all-users.component').then((m) => m.AllUsersComponent),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./products/products.component').then(
        (m) => m.AllProductsComponent
      ),
  },
  {
    path: 'process',
    loadComponent: () =>
      import('./process/process.component').then((m) => m.AllProcessComponent),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./categories/categories.component').then(
        (m) => m.AllCategoriesComponent
      ),
  },
  // !important
  { path: 'customers', component: UserListComponent },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.component').then((m) => m.ProfileComponent),
  },
];
