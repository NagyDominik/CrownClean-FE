import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/User/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilteredList } from '../../models/FilteredList/FilteredList';
import { UserFilter } from '../../models/User/UserFilter';
import { TokenService } from '../token_service/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<FilteredList> {
    return this.http.get<FilteredList>(environment.apiURL + 'users');
  }

  getFilteredUsers(userFilter: UserFilter): Observable<FilteredList> {
    const httpParams = new HttpParams()
    .set('currentPage', userFilter.currentPage.toString())
    .set('itemsPerPage', userFilter.itemsPerPage.toString());
    return this.http.get<FilteredList>(environment.apiURL + 'users', {params: httpParams});
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
