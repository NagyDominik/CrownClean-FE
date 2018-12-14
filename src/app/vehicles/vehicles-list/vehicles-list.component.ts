import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/shared/services/vehicle_service/vehicle.service';
import { Vehicle } from 'src/app/shared/models/Vehicle/vehicle';
import { MatSnackBar, PageEvent } from '@angular/material';
import { UserService } from '../../shared/services/user_service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/User/user';
import { TokenService } from 'src/app/shared/services/token_service/token.service';
import { VehicleFilter } from 'src/app/shared/models/Vehicle/VehicleFilter';

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
  datasource: Vehicle[];
  pageEvent: PageEvent;
  length: number;

  ngOnInit() {
    console.log(this.pageEvent);
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

  refresh() {
    const filter = new VehicleFilter();
    filter.currentPage = 1;
    filter.itemsPerPage = 5;
    filter.userID = this.currentUser.id;

    this.vehicleService.getFilteredVehicles(filter).subscribe(result => {
      this.datasource = result.list;
      this.length = result.count;
    }, err => {
      console.log(err);
      this.openSnackBar('Unable to retrieve vehicles: ' + err.error);
    });
  }

  getData(event: PageEvent) {
    const filter = new VehicleFilter();
    filter.currentPage = event.pageIndex + 1;
    filter.itemsPerPage = event.pageSize;
    filter.userID = this.currentUser.id;
    this.vehicleService.getFilteredVehicles(filter).subscribe(result => {
      this.datasource = result.list;
      this.length = result.count;
    }, err => {
      console.log(err);
      this.openSnackBar('Unable to retrieve vehicles: ' + err.error);
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 1500,
    });
  }
}
