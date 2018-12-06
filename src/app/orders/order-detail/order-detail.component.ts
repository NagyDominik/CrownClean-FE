import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order_service/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../shared/models/order';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  constructor(private orderService: OrderService,
    private route: ActivatedRoute, private router: Router, private location: Location, public snackBar: MatSnackBar) { }

  currentOrder: Order;

  ngOnInit() {
    this.getOrder();
  }

  back() {
    this.location.back();
  }

  getOrder() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.orderService.getOrderByID(id).subscribe(user => {
      this.currentOrder = user;
    },
      error => {
        console.log(error.message);
        alert(error.message);
      }
    );
  }

  approve(id: number) {
    this.orderService.approveOrder(id).subscribe(message => {
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
