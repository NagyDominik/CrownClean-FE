import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { TokenService } from '../services/token_service/token.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private tokenService: TokenService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.tokenService.getToken() && (!this.tokenService.isTokenExpired())) {
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }
}
