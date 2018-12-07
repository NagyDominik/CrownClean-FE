import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication_service/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.authService.redirectURL = state.url;
    if (this.authService.getToken() && (Date.now() < this.authService.getLoginTime())) {
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }
}
