import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from '../../models/Vehicle/vehicle';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilteredVehicleList } from '../../models/Vehicle/FilteredVehicleList';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<FilteredVehicleList>
  {
    return this.http.get<FilteredVehicleList>(environment.apiURL + 'vehicles');
  }

  getVehicleByID(id: number): Observable<Vehicle>
  {
    return this.http.get<Vehicle>(environment.apiURL + 'vehicles/' + id);
  }

  updateVehicle(vehicle: Vehicle): Observable<any>
  {
    const id = vehicle.id;
    return this.http.put(environment.apiURL + 'vehicles/' + id, vehicle, {responseType: 'text'});
  }

  addVehicle(vehicle: Vehicle): Observable<any>
  {
    return this.http.post(environment.apiURL + 'vehicles', vehicle, {responseType: 'text'});
  }

  deleteVehicle(id: number): Observable<any>
  {
    return this.http.delete(environment.apiURL + 'vehicles/' + id);
  }
}
