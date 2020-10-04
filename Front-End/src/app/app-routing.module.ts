import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OuvragesComponent } from './ouvrages/ouvrages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { OuvrageDetailComponent } from './ouvrage-detail/ouvrage-detail.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'detail/:id', component: OuvrageDetailComponent },
  { path: 'ouvrage', component: OuvragesComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
