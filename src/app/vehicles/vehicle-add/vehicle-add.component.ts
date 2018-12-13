import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { DISABLED } from '@angular/forms/src/model';
import { VehicleService } from 'src/app/shared/services/vehicle_service/vehicle.service';
import { CustomSnackbar } from 'src/app/shared/snackbar/sncakbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.css']
})
export class VehicleAddComponent implements OnInit {

  newVehicleForm = new FormGroup({
    Brand: new FormControl(''),
    UniqueID: new FormControl(''),
    Type: new FormControl(''),
    Size: new FormControl({value: '', disabled: true}),
    InternalPlus: new FormControl(''),
  });

  typeList: string[] =
    ['Small',
    'Midsize',
    'Large/Wagon',
    'MPV',
    'Boat'];
  vehicleIsBoat = false;

  constructor(private vehicleService: VehicleService,
              private snackBar: CustomSnackbar,
              private router: Router) { }

  ngOnInit() {

  }

  changeBoatSelection() {
    this.vehicleIsBoat = !this.vehicleIsBoat;
    if (this.vehicleIsBoat) {
      console.log('Vehicle is boat');
      this.newVehicleForm.get('Size').enable();
    } else {
      console.log('Vehicle is not boat');
      this.newVehicleForm.get('Size').disable();
    }

  }
  save() {
    const vehicle = this.newVehicleForm.value;
    this.vehicleService.addVehicle(vehicle).subscribe(success => {
      this.snackBar.openSnackBar('Vehicle added!', 1500);
      this.router.navigateByUrl('/'); // User should be redirected to the previous page
    }, err => {
        console.log(err);
        this.snackBar.openSnackBar('Failed to add vehicle! ' + err.error, 1500);
      }
    );
  }

}
