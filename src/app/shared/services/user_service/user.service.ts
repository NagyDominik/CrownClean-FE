import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>
  {
    return this.http.get<User[]>(environment.apiURL + 'users');
  }

  getUserByID(id: number): Observable<User>
  {
    return this.http.get<User>(environment.apiURL + 'users/' + id);
  }

  updateUser(user: User): Observable<any>
  {
    const id = user.id;
    return this.http.put(environment.apiURL + 'users/' + id, user, {responseType: 'text'});
  }

  addUser(user: User): Observable<any>
  {
    debugger;
    return this.http.post(environment.apiURL + 'users', user, {responseType: 'text'});
  }

  deleteUser(id: number): Observable<any>
  {
    return this.http.delete(environment.apiURL + 'users/' + id, {responseType: 'text'});
  }
}