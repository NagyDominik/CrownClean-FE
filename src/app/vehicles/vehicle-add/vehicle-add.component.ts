import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

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
    Size: new FormControl(''),
    InternalPlus: new FormControl(''),
  });

  typeList: string[] =
    ['Small',
    'Midsize',
    'Large/Wagon',
    'MPV',
    'Boat'];
  vehicleIsBoat = false;

  constructor() { }

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
  }

}
