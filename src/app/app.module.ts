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
import { MatButtonModule, MatRippleModule, MatSidenavModule,
        MatIconModule, MatProgressSpinnerModule, MatCardModule, MatDividerModule,
        MatTableModule, MatSortModule} from '@angular/material';
import {MatExpansionModule, MatSnackBarModule, MatMenuModule, MatToolbarModule,
        MatFormFieldModule, MatInputModule, MatCheckboxModule} from '@angular/material';
import { AdminComponent } from './admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PrivacyPolicyComponent } from './information_pages/privacy-policy/privacy-policy.component';
import { LoginService } from './shared/services/login_service/login.service';
import { TokenService } from './shared/services/token_service/token.service';
import { ProfileComponent } from './profile/profile.component';

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
    VehiclesListComponent,
    LoginComponent,
    RegisterComponent,
    PrivacyPolicyComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatRippleModule,
    MatSidenavModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatSortModule,
    MatExpansionModule,
    MatSnackBarModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatMenuModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatCheckboxModule,
    FormsModule
  ],
  providers: [
    LoginService,
    TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
