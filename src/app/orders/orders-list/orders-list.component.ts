import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../shared/services/order_service/order.service';
import { Order } from '../../shared/models/order';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  constructor(private orderService: OrderService, public snackBar: MatSnackBar) { }
  orders: Order[];

  ngOnInit() {
    this.refresh();
  }
  refresh(){
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
      this.openSnackBar("Order has been deleted!");
    },
      error => {
        console.log(error);
        this.openSnackBar(error.error);
      }
    );
  }
  approve(id: number) {
    this.orderService.approveOrder(id).subscribe(message => {
      this.refresh();
      this.openSnackBar("Order has been approved!");
    },
      error => {
        console.log(error);
        this.openSnackBar(error.error);
      }
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message,'OK', {
      duration: 1500,
    })
  }
}
