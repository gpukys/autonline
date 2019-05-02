import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, ReactiveFormsModule, AbstractControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatInputModule } from '@angular/material';
import { ClassifiersService } from 'src/app/classifiers.service';
import { ServiceService } from 'src/app/service.service';
import * as classifiers from 'src/classifiers.types';
import { carWrapper2, Car } from 'src/autonline.types';
import { Router } from '@angular/router';


@Component({
  selector: 'app-car-create',
  templateUrl: './car-create.component.html',
  styleUrls: ['./car-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CarCreateComponent implements OnInit {
  formGroup = new FormGroup({ brandControl: new FormControl(''), modelControl: new FormControl('') })

  car: Car = carWrapper2;
  brands: any = [];
  filteredBrands: Observable<string[]>;
  filteredModels: Observable<string[]>;
  selectedBrand: classifiers.Brand = null;
  selectedModel: String = null;
  chassisTypes: classifiers.Base;
  fuelTypes: classifiers.Base;
  transmissionTypes: classifiers.Base;
  carWrapper: Car = carWrapper2;
  yearArray = Array(2018 - 1960 + 1).fill(0).map((item, index) => {return 2018-index});
  carList: Car[] = [];

  constructor(private classifiers: ClassifiersService, private service: ServiceService, private router: Router) { }

  ngOnInit() {
    var self = this;
    this.carWrapper.clearAll();
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
    this.formGroup.controls.modelControl.disable();

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

  public onBrandChange(event) {
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

  public onModelChange(event) {
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

  public submitQuery() {
    var self = this;
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
    this.service.createCarUsingPOST(this.carWrapper).subscribe((data: Car[]) => {
      self.router.navigateByUrl('/');
    });
    
  }

  private resetFormValues() {
    this.selectedBrand = null;
    this.selectedModel = null;
    this.formGroup.controls.brandControl.setValue('');
    this.formGroup.controls.modelControl.setValue('');
    this.formGroup.controls.modelControl.disable();
  }

}
