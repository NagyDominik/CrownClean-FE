import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/User/user';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiURL = '';
  redirectURL = '';

  public isLoggedIn = new BehaviorSubject<boolean>(!!this.getToken());

  constructor(private http: HttpClient) { }


  getToken(): string {
    /* const currentUser = JSON.parse(localStorage.getItem('CleanAppUser'));
    return currentUser && currentUser.token;*/
    return localStorage.getItem('token');
  }

  public setToken(token: string) {
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
  
  getUsername(): string {
    const currentUser = JSON.parse(localStorage.getItem('CleanAppUser'));
    return currentUser && currentUser.username;
  }

  getLoginTime(): number {
    const currentUser = JSON.parse(localStorage.getItem('CleanAppUser'));
    return currentUser && currentUser.logintime;
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

  logout(): void {
    localStorage.removeItem('CleanAppUser');
  }
}
