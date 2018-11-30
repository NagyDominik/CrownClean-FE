import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users/users-list/users-list.component';
import {  HttpClientModule } from "@angular/common/http";

const routes: Routes = [
  {path: 'users', component: UsersListComponent}
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
