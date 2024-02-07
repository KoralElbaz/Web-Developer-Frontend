import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataComponent } from './components/data/data.component';
import { FilterComponent } from './components/filter/filter.component';
import { DetailsComponent } from './components/details/details.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { DataRoutingModule } from './data-routing.module';
import {DialogModule } from 'primeng/dialog';
import {ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    DataComponent,
    FilterComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    DataRoutingModule,
    AgGridModule,
    FormsModule,
    DialogModule,
    ButtonModule,
  ],
  exports:[
    DataComponent
  ]
})
export class DataModule {
  constructor(){
    console.log('data-ctor');

  }
 }
