import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Car, carWrapper } from 'src/autonline.types';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CarEditComponent implements OnInit {

  car: Car = carWrapper;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getCar(this.route.snapshot.params['id']);
  }

  getCar(id) {
    this.http.get('/car/' + id).subscribe((data: Car) => {
      this.car = data;
    });
  }

  updateCar(id: String) {
    this.http.put('/car/' + id, this.car)
      .subscribe((res: Car) => {
          const carId = res._id;
          this.router.navigate(['/car-details', carId]);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
