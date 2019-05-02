import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatFormFieldModule, MatAutocompleteModule, MatNativeDateModule, MatSelectModule } from '@angular/material';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { CarComponent } from './car/car.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarCreateComponent } from './car-create/car-create.component';
import { CarEditComponent } from './car-edit/car-edit.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CarSearchComponent } from './car-search/car-search.component';

const appRoutes: Routes = [
  {
    path: 'cars',
    component: CarComponent,
    data: { title: 'Car List' }
  },
  {
    path: 'car-details/:id',
    component: CarDetailComponent,
    data: { title: 'Car Details' }
  },
  {
    path: 'new',
    component: CarCreateComponent,
    data: { title: 'Naujas skelbimas' }
  },
  {
    path: 'car-edit/:id',
    component: CarEditComponent,
    data: { title: 'Edit Car' }
  },
  { path: '',
    component: MainPageComponent,
    data: { title: 'Pagrindinis puslapis' }
  },
  { path: 'car/:id',
    component: CarDetailComponent,
    data: { title: 'Skelbimo peržiūra' }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    CarDetailComponent,
    CarCreateComponent,
    CarEditComponent,
    SidebarComponent,
    MainPageComponent,
    CarSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
