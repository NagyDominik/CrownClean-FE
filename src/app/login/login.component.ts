import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../shared/services/authentication_service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    Email: new FormControl(''),
    Password: new FormControl('')
  });

  constructor(
    private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  login() {
    const userLoginData = this.loginForm.value;
    this.authenticationService.login(this.loginForm.controls['Email'].value, this.loginForm.controls['Password'].value)
      .subscribe(
        success => {
          this.router.navigate([this.authenticationService.redirectURL]);
        });
  }
}
