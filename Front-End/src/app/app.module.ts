import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OuvragesComponent } from './ouvrages/ouvrages.component';
import { OuvrageDetailComponent } from './ouvrage-detail/ouvrage-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";
import {FormsModule} from "@angular/forms";
import {ModalComponent} from './modal/modal.component';
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    OuvragesComponent,
    OuvrageDetailComponent,
    DashboardComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    MatIconModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
