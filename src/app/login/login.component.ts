import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import { LoginService } from '../shared/services/login_service/login.service';
import { MatSnackBar } from '@angular/material';
import { TokenService } from '../shared/services/token_service/token.service';

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

  constructor(private router: Router,
              private loginService: LoginService,
              private snackBar: MatSnackBar,
              private tokenService: TokenService) { }

  ngOnInit() {
    // reset login status
    this.loginService.logout();
  }

  login() {
    this.loginService.login(this.loginForm.controls['Email'].value, this.loginForm.controls['Password'].value)
      .subscribe(
        success => {
          this.openSnackBar('Successfull login!');
          if (this.tokenService.isAdmin.getValue()) {
            this.router.navigateByUrl('admin');
          } else {
            this.router.navigateByUrl('profile');
          }
        },
          error => {
            if (error.status === 400) {
              this.openSnackBar('Bad Request, please enter a pair of valid email address and password!');
            } else if (error.status === 401) {
              this.openSnackBar('Unauthorized, please enter a pair of valid email address and password!');
            } else {
              this.openSnackBar('Could not log in!');
            }

            this.loginForm.reset();
          }
        );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 1500,
    });
  }
}
