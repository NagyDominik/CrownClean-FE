import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../shared/services/order_service/order.service';
import {Order} from '../../shared/models/order';


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  constructor(private orderService: OrderService) { }
  orders: Order[];

  ngOnInit() {
    this.refresh();
  }
  refresh() {

    this.orderService.getOrders().subscribe(listOfOrders => {
        this.orders = listOfOrders;
      },
      error => {
        console.log(error.message);
        alert(error.message);
      }
    );
  }

  delete(id: number) {
    this.orderService.deleteOrder(id).subscribe(message => {
        this.refresh();
      },
      error => {
        console.log(error.message);
        alert(error.message);
      }
    );
  }


}
