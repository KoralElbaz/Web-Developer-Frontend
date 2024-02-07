import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdsSelectionComponent } from './components/ids-selection/ids-selection.component';
import { SubjectsSelectionComponent } from './components/subjects-selection/subjects-selection.component';
import { ChartDisplayComponent } from './components/chart-display/chart-display.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
const routes: Routes = [
  {
    path: '', component: ChartDisplayComponent
  }
];

@NgModule({
  declarations: [
    IdsSelectionComponent,
    SubjectsSelectionComponent,
    ChartDisplayComponent
  ],
  imports: [
    FormsModule,
    DragDropModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    ChartDisplayComponent
  ]
})
export class AnalysisModule { }
