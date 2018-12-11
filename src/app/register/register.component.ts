import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {listener} from '@angular/core/src/render3';
import {interpolateParams} from '@angular/animations/browser/src/util';
import {checkBinding} from '@angular/core/src/view/util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signUpForm = new FormGroup({
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
    PhoneNumber: new FormControl(''),
    Email: new FormControl(''),
    Password: new FormControl(''),
    IsCompany: new FormControl(''),
    Address: new FormControl('')
  });

  constructor(private router: Router) {
  }

  ngOnInit() {

    /* register() {
       const userSignUpData = this.signUpForm.value;
       this.authenticationService.login(this.loginForm.controls['Email'].value, this.loginForm.controls['Password'].value)
         .subscribe(
           success => {
             this.router.navigate([this.authenticationService.redirectURL]);
           });
     }*/
  }

}
