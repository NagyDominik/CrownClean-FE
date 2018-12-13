import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/shared/services/vehicle_service/vehicle.service';
import { Vehicle } from 'src/app/shared/models/Vehicle/vehicle';
import {User} from '../../shared/models/User/user';
import {MatSnackBar} from '@angular/material';
import {UserService} from '../../shared/services/user_service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FilteredVehicleList} from '../../shared/models/Vehicle/FilteredVehicleList';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css']
})
export class VehiclesListComponent implements OnInit {

  constructor(private vehicleService: VehicleService, public snackBar: MatSnackBar,
              private userService: UserService, private route: ActivatedRoute, private router: Router,
              ) { }

  vehicles: Vehicle[];
  count: number;
  
 list: Vehicle[]


  ngOnInit() {
    this.refresh();
  }


  delete(id: number)
  {
    this.vehicleService.deleteVehicle(id).subscribe(() =>{
      this.refresh();
    },
      error =>{
        console.log(error);
        alert(error.error);
      }
    );
  }

  refresh() {
    this.vehicleService.getVehicles().subscribe(vehicleList => {
      this.vehicles = vehicleList.vehicles;
      this.count = vehicleList.count;
    },
      error => {
        console.log(error);
        alert(error.error);
      }
    );
  }

  getUser() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUserByID(id).subscribe(user => {
       this.list = user.vehicles;
      },
      err => {
        console.log(err);
        this.openSnackBar(err.error);
      }
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 1500,
    });
  }

}
