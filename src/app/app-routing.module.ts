import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';

import { UserUpdateComponent } from './users/user-update/user-update.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { AdminComponent } from './admin/admin.component';
import { VehiclesListComponent } from './vehicles/vehicles-list/vehicles-list.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';
import { VehicleDetailComponent } from './vehicles/vehicle-detail/vehicle-detail.component';
import { OrderAddComponent } from './orders/order-add/order-add.component';
import {CarsComponent} from './information_pages/cars/cars.component';
import {BoatsComponent} from './information_pages/boats/boats.component';
import {WelcomeComponent} from './welcome/welcome.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'orders', component: OrdersListComponent },
      { path: 'orders/:id', component: OrderDetailComponent },
      { path: 'users', component: UsersListComponent },
      { path: 'users/:id', component: UserDetailComponent },
      { path: 'user-update/:id', component: UserUpdateComponent },
    ]
  },
  { path: 'orders', component: OrdersListComponent },
  { path: 'orders/:id', component: OrderDetailComponent },
  { path: 'order-add', component: OrderAddComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: 'user-update/:id', component: UserUpdateComponent },
  { path: 'user-add', component: UserAddComponent },
  { path: 'vehicles', component: VehiclesListComponent },
  { path: 'vehicles/:id', component: VehicleDetailComponent},
  {path: 'services/cars', component: CarsComponent},
  {path: 'services/boats', component: BoatsComponent},
  {path: 'welcome', component: WelcomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
