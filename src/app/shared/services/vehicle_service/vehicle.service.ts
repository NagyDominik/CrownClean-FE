import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from '../../models/vehicle';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Vehicle[]>
  {
    return this.http.get<Vehicle[]>(environment.apiURL + 'vehicles');
  }

  getVehicleByID(id: number): Observable<Vehicle>
  {
    return this.http.get<Vehicle>(environment.apiURL + 'vehicles/' + id);
  }

  updateVehicle(vehicle: Vehicle): Observable<any>
  {
    return this.http.put(environment.apiURL + 'vehicles', vehicle, {responseType: 'text'});
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
