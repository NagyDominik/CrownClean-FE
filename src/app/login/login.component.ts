import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import { LoginService } from '../shared/services/login_service/login.service';
import { TokenService } from '../shared/services/token_service/token.service';
import { MatSnackBar } from '@angular/material';

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
    this.loginForm.patchValue({
      Email: 'john@mail.dk',
      Password: 'Password123'
    });
    // reset login status
    this.loginService.logout();
  }

  login() {
    this.loginService.login(this.loginForm.controls['Email'].value, this.loginForm.controls['Password'].value)
      .subscribe(
        success => {
          this.openSnackBar('Successfull login!', 1500);
          if (this.tokenService.isAdmin.getValue()) {
            this.router.navigateByUrl('admin/orders');
          } else {
            this.router.navigateByUrl('profile');
          }
        },
          error => {
            if (error.status === 400) {
              this.openSnackBar('Bad Request, please enter a pair of valid email address and password!', 1500);
            } else if (error.status === 401) {
              this.openSnackBar('Unauthorized, please enter a pair of valid email address and password!', 1500);
            } else {
              this.openSnackBar('Could not log in!', 1500);
            }

            this.loginForm.reset();
          }
        );
  }

  openSnackBar(message: string, duration: number) {
    this.snackBar.open(message, 'OK', {
      duration: duration,
    });
  }

}
