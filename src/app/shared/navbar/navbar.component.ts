import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../services/login_service/login.service';
import { TokenService } from '../services/token_service/token.service';
import { Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{

  subscription: Subscription;
  loggedIn: boolean;
  emailAddr: string;

  constructor(private loginService: LoginService,
              private tokenService: TokenService) { }

  ngOnInit() {
    this.subscription = this.tokenService.isLoggedIn
      .pipe(
        switchMap(isLoggedIn => {
          this.loggedIn = isLoggedIn;
          return this.tokenService.getUserFromToken();
        })
      ).subscribe(user => {
          this.emailAddr = user ? user.emailAddress : '';
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLogout(event) {
    this.loginService.logout()
      .pipe(
        take(1)
      ).subscribe(() => {
        this.loggedIn = false;
    });
  }

}
