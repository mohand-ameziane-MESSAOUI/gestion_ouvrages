import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OuvrageService} from "../ouvrage.service";
import {Ouvrage} from "../ouvrage";

@Component({
  selector: 'app-ouvrage-detail',
  templateUrl: './ouvrage-detail.component.html',
  styleUrls: ['./ouvrage-detail.component.css']
})
export class OuvrageDetailComponent implements OnInit {

  ouvrage: Ouvrage;

  constructor(
    private route: ActivatedRoute,
    private ouvrageService: OuvrageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getOuvrage();
  }

  getOuvrage(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.ouvrageService.getOuvrage(id)
      .subscribe(ouvrage => this.ouvrage = ouvrage);
  }

}
