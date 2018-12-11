import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/User/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilteredUserList } from '../../models/User/FilteredUserList';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<FilteredUserList> {
    return this.http.get<FilteredUserList>(environment.apiURL + 'users');
  }

  getUserByID(id: number): Observable<User> {
    return this.http.get<User>(environment.apiURL + 'users/' + id);
  }

  updateUser(user: User): Observable<any> {
    const id = user.id;
    return this.http.put(environment.apiURL + 'users/' + id, user, {responseType: 'text'});
  }
  addUser(user: User): Observable<User> {
    return this.http.post<User>(environment.apiURL + 'users', user);
  }
  approveUser(id: number): Observable<any> {
    return this.http.put(environment.apiURL + 'users/approve/' + id, '');
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(environment.apiURL + 'users/' + id, {responseType: 'text'});
  }
}
