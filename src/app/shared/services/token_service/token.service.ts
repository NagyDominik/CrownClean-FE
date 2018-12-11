import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject, Subscription, from} from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../models/User/user';

@Injectable()
export class TokenService {
  // public isLoggedIn = new Subject<string>();
  public isLoggedIn = new BehaviorSubject<boolean>(!!this.getToken());

  constructor() {}

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public setToken(token: string) {
    console.log(token);
    localStorage.setItem('token', token);
    this.isLoggedIn.next(!!token);
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

  public getUserFromToken(): Observable<User> {
    return Observable.create(obs => {
      const token = this.getToken();
      let decoded: User;
      if (token) {
        const jwt = new JwtHelperService();
        decoded = jwt.decodeToken(token);
        console.log(jwt.decodeToken(token));
      }
      obs.next(decoded);
    });

  }
}