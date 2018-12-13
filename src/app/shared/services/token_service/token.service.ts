import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject, Subscription, from} from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../models/User/user';

@Injectable()
export class TokenService {
  // public isLoggedIn = new Subject<string>();
  public isLoggedIn = new BehaviorSubject<boolean>(!!this.getToken());
  public isAdmin = new BehaviorSubject<boolean>(this.getAdminPrivilages());

  constructor() {}

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public setToken(token: string) {
    localStorage.setItem('token', token);
    this.isLoggedIn.next(!!token);
    this.isAdmin.next(this.getAdminPrivilages());
  }

  public clearToken() {
    localStorage.removeItem('token');
    this.isLoggedIn.next(undefined);
  }

  public isAuthenticated(): Observable<boolean> {
    // get the token aand notify listeners!
    return Observable.create(obs => {
      obs.next(this.getToken());
    });
  }

  public getUserFromToken(): Observable<any> {
    return Observable.create(obs => {
      const token = this.getToken();
      let decoded: User;
      if (token) {
        const jwt = new JwtHelperService();
        decoded = jwt.decodeToken(token);
      }
      obs.next(decoded);
    });

  }

  public isTokenExpired(): boolean {
    const token = this.getToken();
    if (token) {
      const jwt = new JwtHelperService();
      const date = jwt.getTokenExpirationDate(token);
      console.log(date);
      if (date === undefined) {
        return false;
      }
      return !(date.valueOf() > new Date().valueOf());
    } else {
      return false;
    }

  }

  private getAdminPrivilages(): boolean {
    const token = this.getToken();
    if (token) {
      const jwt = new JwtHelperService();
      const decoded = jwt.decodeToken(token);
      if (decoded) {
        if (decoded.role && decoded.role === 'Administrator') {
          console.log('User is admin!');
          return true;
        } else {
          console.log('User is not admin!');
          return false;
        }
      }
    } else {
      return false;
    }
  }
}
