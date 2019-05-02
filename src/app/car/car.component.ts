import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from 'src/autonline.types';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  public cars: Car;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/car').subscribe((data: Car) => {
      this.cars = data;
    });
  }

}
