import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserUpdateComponent } from './users/user-update/user-update.component';
import { AdminComponent } from './admin/admin.component';
import { VehiclesListComponent } from './vehicles/vehicles-list/vehicles-list.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';
import { VehicleDetailComponent } from './vehicles/vehicle-detail/vehicle-detail.component';
import { OrderAddComponent } from './orders/order-add/order-add.component';
import { WelcomeComponent} from './welcome/welcome.component';
import { LoginComponent} from './login/login.component';
import { RegisterComponent} from './register/register.component';
import { PrivacyPolicyComponent} from './information_pages/privacy-policy/privacy-policy.component';
import { CleaningServicesComponent } from './information_pages/cleaning-services/cleaning-services.component';
import { AboutusComponent } from './information_pages/aboutus/aboutus.component';
import { ContactComponent } from './information_pages/contact/contact.component';
import { VehicleAddComponent} from './vehicles/vehicle-add/vehicle-add.component';
import { ProfileComponent} from './profile/profile.component';
import { AdminAuthGuard } from './shared/guard/adminAuth.guard';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'orders', component: OrdersListComponent, canActivate: [AdminAuthGuard] },
      { path: 'orders/:id', component: OrderDetailComponent, canActivate: [AdminAuthGuard] },
      { path: 'users', component: UsersListComponent, canActivate: [AdminAuthGuard] },
      { path: 'users/:id', component: UserDetailComponent, canActivate: [AdminAuthGuard] },
      { path: 'user-update/:id', component: UserUpdateComponent, canActivate: [AdminAuthGuard] },
    ], canActivate: [AdminAuthGuard]
  },
  { path: 'orders', component: OrdersListComponent, canActivate: [AuthGuard]},
  { path: 'user-update/:id', component: UserUpdateComponent, canActivate: [AuthGuard] },
  { path: 'orders/:id', component: OrderDetailComponent, canActivate: [AuthGuard]},
  { path: 'order-add', component: OrderAddComponent, canActivate: [AuthGuard] },
  { path: 'vehicles', component: VehiclesListComponent, canActivate: [AuthGuard] },
  { path: 'vehicles/:id', component: VehicleDetailComponent, canActivate: [AuthGuard] },
  { path: 'vehicle-add', component: VehicleAddComponent, canActivate: [AuthGuard] },
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'privacyPolicy', component: PrivacyPolicyComponent },
  { path: 'services', component: CleaningServicesComponent },
  { path: 'about', component: AboutusComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
