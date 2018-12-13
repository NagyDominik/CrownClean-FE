import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token_service/token.service';
import { first, map } from 'rxjs/operators';


@Injectable()
export class AdminAuthGuard implements CanActivate {
    path: ActivatedRouteSnapshot[];
    route: ActivatedRouteSnapshot;

  constructor(private router: Router, private tokenService: TokenService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (!this.tokenService.isTokenExpired()) {
    return this.tokenService.getUserFromToken().pipe(
        first(),
            map(user => {
            if (user && user.role === 'Administrator') {
                return true;
            } else {
                this.router.navigateByUrl('/');
                return false;
            }
        })
    );
    } else {
        this.router.navigateByUrl('/login');
        return false;
    }
  }
}
