import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenService } from '../token_service/token.service';
import { environment } from 'src/environments/environment';
import { User } from '../../models/User/user';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient,
              private tokenService: TokenService) { }

    register(userDTO: User): Observable<boolean> {
    return this.http.post<any>(environment.apiURL + 'login/register', userDTO, {responseType: 'text' as 'json'})
    .pipe(map(res => {
            if (res) {
                if (res === 'USER_ADDED') {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }));
    }

    login(email: Text, password: Text): Observable<boolean> {
        return this.http.post<any>(environment.apiURL + 'login/login', {email, password})
        .pipe(map(response => {
            const token = response && response.token;
            if (token) {
                this.tokenService.setToken(token);
                return true;
            } else {
                return false;
            }
        }));
    }

    public logout(): Observable<boolean> {
        return Observable.create(obs => {
            this.tokenService.clearToken();
            obs.next(!this.tokenService.getToken());
        });
      }
}
