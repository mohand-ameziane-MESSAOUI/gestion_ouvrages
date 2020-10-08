import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OuvragesListComponent } from './ouvrages-list/ouvrages-list.component';

import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'ouvrage', component: OuvragesListComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
