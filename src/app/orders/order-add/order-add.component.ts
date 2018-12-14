import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user_service/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { OrderService } from '../../shared/services/order_service/order.service';
import { VehicleService } from 'src/app/shared/services/vehicle_service/vehicle.service';
import { User } from 'src/app/shared/models/User/user';
import { Vehicle } from 'src/app/shared/models/Vehicle/vehicle';
import {Location} from '@angular/common';
import {TokenService} from '../../shared/services/token_service/token.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private vehicleService: VehicleService,
    private router: Router,
    private location: Location,
    private tokenService: TokenService,
    private snackBar: MatSnackBar,
  ) { }

  orderForm = new FormGroup({
    Vehicle: new FormControl(''),
    Services: new FormControl(''),
    Description: new FormControl(''),
    AtAddress: new FormControl('')
  });

  vehicles: Vehicle[] ;
  cleaningAddress = false;
  currentUser: User;

  atAddressChange() {
    this.cleaningAddress = !this.cleaningAddress;
    if (this.cleaningAddress) {
      console.log('Cleaning At Address!');
      this.orderForm.get('AtAddress').value;
    } else {
      console.log('Not Cleaning AtAddress');
      this.orderForm.get('AtAddress').value;
    }
  }
  ngOnInit() {
    this.tokenService.getUserFromToken().subscribe( userID => this.currentUser = userID);
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
    const order = this.orderForm.value;
    order.user = this.currentUser;
    order.vehicle = this.orderForm.get('Vehicle').value;
    order.atAddress = this.cleaningAddress;
    this.orderService.addOrder(order).subscribe(() => {
      this.router.navigateByUrl('/orders');
    },
      error => {
        debugger;
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
