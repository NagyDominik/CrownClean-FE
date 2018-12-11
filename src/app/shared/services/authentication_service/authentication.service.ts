import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/User/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiURL = '';
  redirectURL = '';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<boolean> {
    const tokenLT = Date.now() + 600_000;

    return this.http.post<any>(this.apiURL + 'login', { email, password })
      .pipe(map(response => {
        const token = response && response.token;
        if (token) {
          localStorage.setItem('CleanAppUser', JSON.stringify({ email: email, token: token, logintime:  tokenLT}));
          return true;
        } else {
          return false;
        }
      }));
  }

  register(userDTO: User): Observable<boolean> {
    const tokenLT = Date.now() + 600_00;

    return this.http.post<any>(environment.apiURL + 'login/register', userDTO)
    .pipe(map(response => {
      const token = response && response.token;
      if (token) {
        localStorage.setItem('CleanAppUser', JSON.stringify({email: userDTO.email, token: token, logintime: tokenLT}));
        return true;
      } else {
        return false;
      }
    }));
  }

  getToken(): string {
    const currentUser = JSON.parse(localStorage.getItem('CleanAppUser'));
    return currentUser && currentUser.token;
  }

  getUsername(): string {
    const currentUser = JSON.parse(localStorage.getItem('CleanAppUser'));
    return currentUser && currentUser.username;
  }

  getLoginTime(): number {
    const currentUser = JSON.parse(localStorage.getItem('CleanAppUser'));
    return currentUser && currentUser.logintime;
  }

  logout(): void {
    localStorage.removeItem('CleanAppUser');
  }
}
