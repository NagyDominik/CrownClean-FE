import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user_service/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { OrderService } from '../../shared/services/order_service/order.service';
import { VehicleService } from 'src/app/shared/services/vehicle_service/vehicle.service';
import { User } from 'src/app/shared/models/User/user';
import { Vehicle } from 'src/app/shared/models/Vehicle/vehicle';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {

  vehicles: Vehicle[] ;

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private vehicleService: VehicleService,
    private router: Router
  ) { }

  orderForm = new FormGroup({
    user: new FormControl(''),
    vehicle: new FormControl(''),
    services: new FormControl(''),
    description: new FormControl(''),
    atAddress: new FormControl('')
  });

  ngOnInit() {
    
  }

  save() {
    const order = this.orderForm.value;
    order.isApproved = false;
    order.approveDate = "02/02/2018";
    order.orderDate = "02/02/2018";
    const user = new User();
    user.id = this.orderForm.get("user").value;
    order.user = user;
    const vehicle = new Vehicle();
    vehicle.id = this.orderForm.get("vehicle").value;
    order.vehicle = user;

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

}
