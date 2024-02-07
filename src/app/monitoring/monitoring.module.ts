import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MonitorDataComponent } from './components/monitor-data/monitor-data.component';
import { NamesSelectionComponent } from './components/names-selection/names-selection.component';
import { StateSelectionComponent } from './components/state-selection/state-selection.component';
import { AgGridModule } from 'ag-grid-angular';
import { IdsSelectionComponent } from './components/ids-selection/ids-selection.component';
import { TooltipModule } from 'primeng/tooltip';


const routes: Routes = [
  {
    path: '', component: MonitorDataComponent
  }
];

@NgModule({
  declarations: [
    MonitorDataComponent,
    NamesSelectionComponent,
    StateSelectionComponent,
    IdsSelectionComponent
  ],
  imports: [
     RouterModule.forChild(routes),
    AgGridModule,
    TooltipModule,
    CommonModule
  ],
  exports:[
    MonitorDataComponent
  ]
})
export class MonitoringModule { }
