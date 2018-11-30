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

  updateUser(user: User): Observable<User>
  {
    const id = user.id;
    return this.http.put<User>(environment.apiURL + 'users/' + id, user);
  }

  addUser(user: User): Observable<User>
  {
    return this.http.post<User>(environment.apiURL + 'users', user);
  }

  deleteCustomer(id: number): Observable<User>
  {
    return this.http.delete<User>(environment.apiURL + 'users/' + id);
  }
}
