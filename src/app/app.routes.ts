import { Routes } from '@angular/router';
import { UserListComponent } from './admin/users/user-list/user-list.component';
import { UserDetailComponent } from './admin/users/user-detail/user-detail.component';

export const routes: Routes = [
    { path: '', component: UserListComponent },
    { path: 'admin/users/:id', component: UserDetailComponent }, 


];
