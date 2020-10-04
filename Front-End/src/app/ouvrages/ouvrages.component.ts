import {Component, OnInit} from '@angular/core';
import {Ouvrage} from "../ouvrage";
import {OuvrageService} from "../ouvrage.service";
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-ouvrages',
  templateUrl: './ouvrages.component.html',
  styleUrls: ['./ouvrages.component.css']
})
export class OuvragesComponent implements OnInit {

  ouvrages: Ouvrage[] = [];
  status: String;
  dataSource: MatTableDataSource<Ouvrage>;
  displayedColumns: string[] = ['titre', 'auteur', 'genre', 'statut', 'modifier', 'supprimer', 'detail'];
  selectedHero: Ouvrage;

  constructor(private ouvrageService: OuvrageService) { }

  ngOnInit() {
    this.getOuvrages();
  }

  getOuvrages(): void {
      this.ouvrageService.getOuvrages()
        .subscribe(res => {
          this.ouvrages = res.data
          this.dataSource = new MatTableDataSource(this.ouvrages);
          console.log("this.ouvrages", this.ouvrages)
        });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteOuvrage(element: Ouvrage) : void {
    console.log("element._id", element._id);
    this.ouvrageService.deleteOuvrage(element._id)
      .subscribe(res =>  this.getOuvrages());
  }

  editOuvrage(element: Ouvrage) {
    this.ouvrageService.editOuvrage(element)

  }

}
