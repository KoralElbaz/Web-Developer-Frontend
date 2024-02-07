import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes =
[
  { path: "data", loadChildren: () => import("./data/data.module").then(am => am.DataModule) },
  { path: "analysis", loadChildren: () => import("./analysis/analysis.module").then(am => am.AnalysisModule) },
  { path: "monitor", loadChildren: () => import("./monitoring/monitoring.module").then(am => am.MonitoringModule) },
  {path: '', redirectTo: '/data', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
