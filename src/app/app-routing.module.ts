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
import {WelcomeComponent} from './welcome/welcome.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {PrivacyPolicyComponent} from './information_pages/privacy-policy/privacy-policy.component';
import { CleaningServicesComponent } from './information_pages/cleaning-services/cleaning-services.component';
import { AboutusComponent } from './information_pages/aboutus/aboutus.component';
import { ContactComponent } from './information_pages/contact/contact.component';
import {VehicleAddComponent} from './vehicles/vehicle-add/vehicle-add.component';
import {ProfileComponent} from './profile/profile.component';

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
  { path: 'vehicle-add', component: VehicleAddComponent},

  {path: 'welcome', component: WelcomeComponent},

  {path: 'login', component: LoginComponent},

  {path: 'register', component: RegisterComponent},

  {path: 'privacyPolicy', component: PrivacyPolicyComponent},
  
  {path: 'services', component: CleaningServicesComponent},
  
  {path: 'about', component: AboutusComponent},

  {path: 'contact', component: ContactComponent},

  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
