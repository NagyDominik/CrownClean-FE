import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/services/user_service/user.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {OrderService} from '../../shared/services/order_service/order.service';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {

  constructor(private orderService: OrderService,
              private router: Router) { }


  orderForm = new FormGroup({
    user: new FormControl(''),
    vehicle: new FormControl(''),
    orderDate: new FormControl(''),
    services: new FormControl(''),
    description: new FormControl(''),
    atAddress: new FormControl(''),
    isApproved:  new FormControl(''),
    approveDate: new FormControl(''),
  });

  ngOnInit() {
  }

  save() {
    const order = this.orderForm.value;
    order.isApproved = false;
    order.approveDate = null;

    const userID = this.orderForm.get('user').value;


    const vehicleID = this.orderForm.get('vehicle').value;


    order.orderDate = Date.now();
    const services = this.orderForm.get('services').value;
    const description = this.orderForm.get('description').value;
    const atAdress = this.orderForm.get('atAddress').value;

    this.orderService.addOrder(order).subscribe(() => {
        this.router.navigateByUrl('/orders');
      },
      error => {
        debugger;
        console.log(error.message);
        alert(error.message);
      }
    );
  }

}
