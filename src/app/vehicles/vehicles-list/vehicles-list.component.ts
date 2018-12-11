import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/shared/services/vehicle_service/vehicle.service';
import { Vehicle } from 'src/app/shared/models/Vehicle/vehicle';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css']
})
export class VehiclesListComponent implements OnInit {

  constructor(private vehicleService: VehicleService) { }
 
  vehicles: Vehicle[];
  count: number;

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
      this.vehicles = vehicleList.vehicles;
      this.count = vehicleList.count;
    },
      error => {
        console.log(error);
        alert(error.error);
      }
    );
  }

}
