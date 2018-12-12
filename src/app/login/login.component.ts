import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import { LoginService } from '../shared/services/login_service/login.service';

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
    private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    // reset login status
    this.loginService.logout();
  }

  login() {
    this.loginService.login(this.loginForm.controls['Email'].value, this.loginForm.controls['Password'].value)
      .subscribe(
        success => {
          this.router.navigateByUrl('/');
        });
  }
}
