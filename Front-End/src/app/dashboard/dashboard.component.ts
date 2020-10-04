import { Component, OnInit } from '@angular/core';
import {Ouvrage} from "../ouvrage";
import {OuvrageService} from "../ouvrage.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ouvrages: Ouvrage[] = [];

  constructor(private ouvrageService: OuvrageService) { };

  ngOnInit() {
    this.getOuvrages();
  }

  getOuvrages(): void {
    this.ouvrageService.getOuvrages()
      .subscribe(ouvrages => {this.ouvrages = JSON.parse(JSON.stringify(ouvrages)).data; console.log("ouvrages",JSON.parse(JSON.stringify(ouvrages)).data)});
  }


}
