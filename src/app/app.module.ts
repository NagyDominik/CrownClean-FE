import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserUpdateComponent } from './users/user-update/user-update.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';
import { OrderAddComponent } from './orders/order-add/order-add.component';
import { VehiclesListComponent } from './vehicles/vehicles-list/vehicles-list.component';
import { VehicleDetailComponent } from './vehicles/vehicle-detail/vehicle-detail.component';
import { VehicleAddComponent } from './vehicles/vehicle-add/vehicle-add.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatRippleModule, MatSidenav, MatSidenavModule, MatIconModule, MatProgressSpinnerModule, MatCardModule } from '@angular/material';
import { AdminComponent } from './admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    UserAddComponent,
    UserDetailComponent,
    UserUpdateComponent,
    OrdersListComponent,
    UsersListComponent,
    OrderDetailComponent,
    OrderAddComponent,
    VehiclesListComponent,
    VehicleDetailComponent,
    VehicleAddComponent,
    NavbarComponent,
    AdminComponent,
    VehiclesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRippleModule,
    MatSidenavModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
