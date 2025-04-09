import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { MainLayoutComponentComponent } from './main-layout-component/main-layout-component.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { NewUsersComponent } from './new-users/new-users.component';
import { NewProductsComponent } from './new-products/new-products.component';
import { AllProductsComponent } from './products/products.component';
import { AllProcessComponent } from './process/process.component';
import { AllCategoriesComponent } from './categories/categories.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './Login/login.component';
import { authGuard } from './auth.guard';

import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/statistics', pathMatch: 'full' },

  {
    path: '',
    component: AuthComponent,
    children: [{ path: 'login', component: LoginComponent }],
  },

  {
    path: '',
    component: MainLayoutComponentComponent,
    canActivate: [authGuard],

    children: [
      { path: 'statistics', component: StatisticsComponent },
      { path: 'new-users', component: NewUsersComponent },
      { path: 'new-products', component: NewProductsComponent },
      { path: 'products', component: AllProductsComponent },
      { path: 'processes', component: AllProcessComponent },
      { path: 'categories', component: AllCategoriesComponent },
      { path: 'users', component: UserListComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },

  { path: '**', component: NotFoundComponent },
];
