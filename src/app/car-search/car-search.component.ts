import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, ReactiveFormsModule, AbstractControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatInputModule } from '@angular/material';
import { ClassifiersService } from 'src/app/classifiers.service';
import { ServiceService } from 'src/app/service.service';
import * as classifiers from 'src/classifiers.types';
import { carWrapper, Car } from 'src/autonline.types';

@Component({
  selector: 'app-car-search',
  templateUrl: './car-search.component.html',
  styleUrls: ['./car-search.component.css']
})
export class CarSearchComponent implements OnInit {
  formGroup = new FormGroup({ brandControl: new FormControl(''), modelControl: new FormControl('') })
  brands: any = [];
  filteredBrands: Observable<string[]>;
  filteredModels: Observable<string[]>;
  selectedBrand: classifiers.Brand = null;
  selectedModel: String = null;
  chassisTypes: classifiers.Base;
  fuelTypes: classifiers.Base;
  transmissionTypes: classifiers.Base;
  carWrapper: Car = carWrapper;
  yearArray = Array(2018 - 1960 + 2).fill(0).map((item, index) => {if (index == 0) {return "Visi"} else {return 2019-index}});
  yearInterval: {from,to} = {from:null,to:null};
  carList: Car[] = [];

  constructor(private classifiers: ClassifiersService, private service: ServiceService) { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('carList'))) {
      this.carList = <Car[]>JSON.parse(localStorage.getItem('carList'));
    } else {
      this.carList = [];
    }
    this.carWrapper.clearAll();
    this.carWrapper = carWrapper;
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
    self.classifiers.getAllBrandsUsingGET().subscribe((data: classifiers.Brand) => {
      self.brands = data;
      self.filteredBrands = self.formGroup.controls.brandControl.valueChanges
        .pipe(
          startWith(''),
          map(value => self.brandFilter(value))
        );
      self.filteredModels = self.formGroup.controls.modelControl.valueChanges
        .pipe(
          startWith(''),
          map(value => self.modelFilter(value))
        );
    });
    this.gotCarList();
    this.formGroup.controls.modelControl.disable();
  }
  public gotCarList() {
    return this.carList.length > 0? true : false;
  }
  private brandFilter(value): string[] {
    var filterValue;
    if (value.brand) {
      filterValue = value.brand.toLowerCase();
    } else {
      filterValue = value.toLowerCase();
    }
    return this.brands.filter(brands => brands.brand.toLowerCase().includes(filterValue));
  }

  private modelFilter(value): string[] {
    const filterValue = value.toLowerCase();
    if (this.selectedBrand)
      return <any>this.selectedBrand.models.filter(model => model.toLowerCase().includes(filterValue));
  }

  private onBrandChange(event) {
    const value: string = event.target.value.toLowerCase();
    if (event.relatedTarget && (event.relatedTarget).classList.contains('mat-option')) {
      return;
    }
    if (value) {
      for (let i = 0; i < this.brands.length; i++) {
        const brand = this.brands[i];
        if (brand.brand.toLowerCase() === value) {
          if (this.selectedBrand && this.selectedBrand != brand) {
            this.selectedModel = null;
            this.formGroup.controls.modelControl.setValue('');
          }
          this.selectedBrand = brand;
          this.formGroup.controls.brandControl.setValue(brand.brand);
          this.formGroup.controls.modelControl.enable();
          return;
        }
      }
      this.resetFormValues();
    } else {
      this.resetFormValues();
    }
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

  private onModelChange(event) {
    if (event.relatedTarget && (event.relatedTarget).classList.contains('mat-option')) {
      return;
    }
    var value: string = event.target.value.toLowerCase();
    if (value) {
      for (let i = 0; i < this.selectedBrand.models.length; i++) {
        const model = this.selectedBrand.models[i];
        if (model.toLowerCase() === value) {
          this.selectedModel = model;
          this.formGroup.controls.modelControl.setValue(model);
          return;
        }
        this.selectedModel = null;
        this.formGroup.controls.modelControl.setValue('');
      }
    } else {
      this.selectedModel = null;
      this.formGroup.controls.modelControl.setValue('');
    }
  }

  private submitFindQuery() {
    if (!this.selectedBrand) {
      this.carWrapper.brand = undefined;
    } else {
      this.carWrapper.brand = this.selectedBrand.brand;
    }
    if (!this.selectedModel) {
      this.carWrapper.model = undefined;
    } else {
      this.carWrapper.model = this.selectedModel;
    }
    if (!this.carWrapper.transmissionType) {
      this.carWrapper.transmissionType = undefined;
    }
    if (!this.carWrapper.chassisType) {
      this.carWrapper.chassisType = undefined;
    }
    if (!this.carWrapper.fuelType) {
      this.carWrapper.fuelType = undefined;
    }
    function returnYearIntervalObject(yearInterval): {from,to}{
      let yearIntervalObj: {from,to} = {from: null, to: null};
        if (yearInterval.from && yearInterval.from != "Visi") {
          yearIntervalObj["from"] = yearInterval.from;
        } else {
          yearIntervalObj["from"] = null;
        }
        if (yearInterval.to && yearInterval.to != "Visi") {
          yearIntervalObj["to"] = yearInterval.to;
        } else {
          yearIntervalObj["to"] = null;
        }
        if (yearIntervalObj["from"] || yearIntervalObj["to"]) {
          return yearIntervalObj;
        }
        return null;
    }
    
    this.service.findCarsUsingPOST(this.carWrapper, this.yearInterval? returnYearIntervalObject(this.yearInterval) : null).subscribe((data: Car[]) => {
      localStorage.setItem('carList', JSON.stringify(data));
      this.carList = data;
    });
  }

  private goBack() {
    localStorage.removeItem('carList');
    this.carList = [];
  }

  public gotCars() {
    return this.carList.length > 0 ? true:false;
  }

  private resetFormValues() {
    this.selectedBrand = null;
    this.selectedModel = null;
    this.formGroup.controls.brandControl.setValue('');
    this.formGroup.controls.modelControl.setValue('');
    this.formGroup.controls.modelControl.disable();
  }
}
