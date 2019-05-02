import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Car, carWrapper } from 'src/autonline.types';
import * as classifiers from 'src/classifiers.types';
import { ClassifiersService } from 'src/app/classifiers.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CarDetailComponent implements OnInit {

  car: Car = carWrapper;
  chassisTypes: classifiers.Base;
  fuelTypes: classifiers.Base;
  transmissionTypes: classifiers.Base;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private classifiers: ClassifiersService) { }

  ngOnInit() {
    this.getCarDetail(this.route.snapshot.params['id']);
    var self = this;
    self.classifiers.getAllChassisUsingGET().subscribe((data: classifiers.Base) => {
      this.chassisTypes = data;
    });
    self.classifiers.getAllFuelUsingGET().subscribe((data: classifiers.Base) => {
      this.fuelTypes = data;
    });
    self.classifiers.getAllTransmissionUsingGET().subscribe((data: classifiers.Base) => {
      this.transmissionTypes = data;
    });
  }

  deleteCar(id: String) {
    this.http.delete('api/car/' + id)
      .subscribe((res: Car) => {
          this.router.navigate(['/cars']);
        }, (err) => {
          console.log(err);
        }
      );
  }

  getCarDetail(id) {
    this.http.get('api/car/' + id).subscribe((data: Car) => {
      this.car = data;
    });
  }

  private getNameById(classifier, id):Object {
    var answer = classifier.find(element => {
      return element.id == id;
    })
    if (answer) {
      return answer['name'];
    }
    return false;
  }

}
