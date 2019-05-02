import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Car} from 'src/autonline.types';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  findCarsUsingPOST(car: Car, yearInterval?: {from,to}) {
    if (yearInterval) {
      let obj = JSON.parse(JSON.stringify(car));
      obj["yearInterval"] = {from: yearInterval.from, to: yearInterval.to};
      return this.http.post('api/car/find', obj); 
    }
    return this.http.post('api/car/find', car); 
  }

  createCarUsingPOST(car: Car) {
    return this.http.post('api/car', car); 
  }
}
