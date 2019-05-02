import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as classifiers from 'src/classifiers.types';

@Injectable({
  providedIn: 'root'
})
export class ClassifiersService {

  constructor(private http: HttpClient) { }

  getAllBrandsUsingGET() {
    return this.http.get('api/classifier/brands'); 
  }

  getAllChassisUsingGET() {
    return this.http.get('api/classifier/chassis'); 
  }

  getAllFuelUsingGET() {
    return this.http.get('api/classifier/fuel'); 
  }

  getAllTransmissionUsingGET() {
    return this.http.get('api/classifier/transmission'); 
  }
}
