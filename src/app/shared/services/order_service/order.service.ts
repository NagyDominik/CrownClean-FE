import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Order } from '../../models/Order/order';
import { FilteredList } from '../../models/FilteredList/FilteredList';
import { OrderFilter } from '../../models/Order/OrderFilter';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders(): Observable<FilteredList> {
    return this.http.get<FilteredList>(environment.apiURL + 'orders');
  }

  getFilteredOrders(filter: OrderFilter): Observable<FilteredList> {
    const httpParams = new HttpParams()
    .set('currentPage', filter.currentPage.toString())
    .set('itemsPerPage', filter.itemsPerPage.toString())
    .set('UserID', filter.UserID.toString());
    return this.http.get<FilteredList>(environment.apiURL + 'orders', {params: httpParams});
  }

  getOrderByID(id: number): Observable<Order> {
    return this.http.get<Order>(environment.apiURL + 'orders/' + id);
  }
  updateOrder(order: Order): Observable<Order> {
    const id = order.id;
    return this.http.put<Order>(environment.apiURL + 'users/' + id, order);
  }

  approveOrder(id: number): Observable<any> {
    return this.http.put(environment.apiURL + 'orders/approve/' + id, '');
  }

  addOrder(order: Order): Observable<any> {
    return this.http.post(environment.apiURL + 'orders', order);
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete(environment.apiURL + 'orders/' + id);
  }
}
