import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../shared/services/order_service/order.service';
import {ActivatedRoute} from '@angular/router';
import {Order} from '../../shared/models/order';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  constructor(private orderService: OrderService,
              private route: ActivatedRoute) { }

  currentOrder: Order;

  ngOnInit() {
    this.getOrder();
  }

  getOrder()
  {
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
}
