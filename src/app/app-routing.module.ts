import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import {OrdersListComponent} from './orders/orders-list/orders-list.component';
import {OrderDetailComponent} from './orders/order-detail/order-detail.component';
import {AdminComponent} from './admin/admin.component';
import {UserUpdateComponent} from './users/user-update/user-update.component';

const routes: Routes = [
  { path: 'users', component: UsersListComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: 'user-update/:id', component: UserUpdateComponent },


  {path: 'orders', component: OrdersListComponent},
  {path: 'orders/:id', component: OrderDetailComponent},

  { path: 'admin', component: AdminComponent },
  { path: 'admin', component: AdminComponent, children: [
      { path: '', component: OrdersListComponent },
      { path: 'users', component: UsersListComponent },
    ]},
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
