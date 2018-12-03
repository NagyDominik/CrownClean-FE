import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Order} from '../../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>( environment.apiURL + 'orders');
  }

  getOrderByID(id: number): Observable<Order> {

    return this.http.get<Order>(environment.apiURL + 'orders/' + id, );
  }
  updateOrder(order: Order): Observable<Order> {
    const id = order.id;
    return this.http.put<Order>(environment.apiURL + 'users/' + id, order);
  }

  updateOrder(order: Order): Observable<Order> {
    const id = order.id;
    return this.http.put<Order>(environment.apiURL + 'orders/' + id, order);
  }

  approveOrder(id: number): Observable<any> {
    return this.http.put(environment.apiURL + 'orders/approve/' + id, "");
  }

  addOrder(order: Order): Observable<any> {
    return this.http.post(environment.apiURL + 'orders', order);
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete(environment.apiURL + 'orders/' + id);
  }
}
