import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/shared/services/vehicle_service/vehicle.service';
import { Vehicle } from 'src/app/shared/models/Vehicle/vehicle';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../../shared/services/user_service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/User/user';
import { TokenService } from 'src/app/shared/services/token_service/token.service';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css']
})
export class VehiclesListComponent implements OnInit {

  constructor(private vehicleService: VehicleService,
    public snackBar: MatSnackBar,
    private userService: UserService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  currentUser: User;
  vehicles: Vehicle[];
  count: number;

  ngOnInit() {
    this.tokenService.getUserFromToken().subscribe(user => {
      if (!user) {
        this.router.navigateByUrl('login');
      }
      this.currentUser = user;
    });
    this.refresh();
  }


  delete(id: number) {
    this.vehicleService.deleteVehicle(id).subscribe(() => {
      this.refresh();
    },
      error => {
        console.log(error);
        alert(error.error);
      }
    );
  }

  /*refresh() {
    this.vehicleService.getVehicles().subscribe(vehicleList => {
      this.vehicles = vehicleList.vehicles;
      this.count = vehicleList.count;
    },
      error => {
        console.log(error);
        alert(error.error);
      }
    );
  }*/

  refresh() {
    const id = this.currentUser.id;
    this.userService.getUserByID(id).subscribe(user => {
      this.vehicles = user.vehicles;
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
