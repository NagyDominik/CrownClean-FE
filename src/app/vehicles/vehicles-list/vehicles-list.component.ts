import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/shared/services/vehicle_service/vehicle.service';
import { Vehicle } from 'src/app/shared/models/vehicle';
import { reference } from '@angular/core/src/render3';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css']
})
export class VehiclesListComponent implements OnInit {

  constructor(private vehicleService: VehicleService) { }


  vehicles: Vehicle[];

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

  refresh() 
  {
    this.vehicleService.getVehicles().subscribe(vehicleList => {
      debugger;
      this.vehicles = vehicleList;
    },
      error => {
        console.log(error);
        alert(error.error);
      }
    );
  }

}
