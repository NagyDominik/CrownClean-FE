import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user_service/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { OrderService } from '../../shared/services/order_service/order.service';
import { User } from 'src/app/shared/models/User/user';
import { Vehicle } from 'src/app/shared/models/Vehicle/vehicle';
import { Location } from '@angular/common';
import { TokenService } from '../../shared/services/token_service/token.service';
import { MatSnackBar } from '@angular/material';
import { Order } from 'src/app/shared/models/Order/order';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private router: Router,
    private location: Location,
    private tokenService: TokenService,
    private snackBar: MatSnackBar,
  ) { }

  orderForm = new FormGroup({
    Vehicle: new FormControl(''),
    Protection: new FormControl(''),
    Cleaning: new FormControl(''),
    Description: new FormControl(''),
    AtAddress: new FormControl('')
  });

  protectionList: string[] = ['Glass Protection', 'Ceramic Coating', 'Wheel Nano Protection', 'Leather/Textil Protection',
    'Interior Plastic Coating', 'New Car Protection'];
  cleaningList: string[] = ['Interior & Exterior Cleaning', 'Interior Cleaning', 'Headlight Waxing',
    'Waxing', 'Ozone Treatment', 'Engine Cleaning'];
  vehicles: Vehicle[];
  currentUser: User;

  ngOnInit() {
    this.tokenService.getUserFromToken().subscribe(userID => this.currentUser = userID);
    this.userService.getUserByID(this.currentUser.id).subscribe(user => {
      this.currentUser = user;
      console.log(this.currentUser);
    },
      error => {
        console.log(error);
        this.openSnackBar(error.message, 1500);
      }
    );
  }

  back() {
    this.location.back();
  }

  save() {
    const order = new Order();
    order.user = this.currentUser;
    order.vehicle = this.orderForm.get('Vehicle').value
    order.services = "";
    if (!!this.orderForm.get('Protection').value) {
      this.orderForm.get('Protection').value.forEach(x => {
        order.services += x + ', ';
      });
    }
    if (!!this.orderForm.get('Cleaning').value) {
      this.orderForm.get('Cleaning').value.forEach(x => {
        order.services += x + ', ';
      });
    }
    
    if (this.orderForm.get('AtAddress').value === "") {
      order.atAddress = false;
    } else {
      order.atAddress = this.orderForm.get('AtAddress').value;
    }

    this.orderService.addOrder(order).subscribe(() => {
      this.router.navigateByUrl('/orders');
    },
      error => {
        console.log(error);
        alert(error.error);
      }
    );
  }

  openSnackBar(message: string, duration: number) {
    this.snackBar.open(message, 'OK', {
      duration: duration,
    });
  }

}
