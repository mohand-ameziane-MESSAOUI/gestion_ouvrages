import {Component, Input, OnInit} from '@angular/core';
import {Ouvrage} from "../ouvrage";
import {OuvrageService} from "../ouvrage.service";
import {MatTableDataSource} from "@angular/material/table";
import {DashboardComponent} from "../dashboard/dashboard.component";


@Component({
  selector: 'app-ouvrages',
  templateUrl: './ouvrages.component.html',
  styleUrls: ['./ouvrages.component.css']
})
export class OuvragesComponent implements OnInit {

  ouvrages: Ouvrage[] = [];
  status: string;
  dataSource: MatTableDataSource<Ouvrage>;
  displayedColumns: string[] = ['titre', 'auteur', 'genre', 'statut', 'changeStatut', 'modifier', 'supprimer', 'detail'];

  @Input()
  filter: string = "tous";

  constructor(private ouvrageService: OuvrageService, private dashboardComponent: DashboardComponent) { }

  ngOnInit() {
    this.getOuvrages();
  }

  getOuvrages(): void {
      this.ouvrageService.getOuvrages()
        .subscribe(res => {
          this.ouvrages = res.data
          this.dataSource = new MatTableDataSource(this.ouvrages);
          console.log("this.ouvrages", this.ouvrages)
          this.filterToStatut(this.filter)
        });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteOuvrage(element: Ouvrage) : void {
    this.ouvrageService.deleteOuvrage(element._id)
      .subscribe(res =>  this.getOuvrages());
  }

  changeStatut(element: Ouvrage): void{
    this.ouvrageService.changeStatut(element)
      .subscribe(res => {
        this.getOuvrages();
        this.dashboardComponent.getOuvrages();

      });
  }

  editOuvrage(element: Ouvrage) {
    this.ouvrageService.editOuvrage(element)

  }

  private filterToStatut(filter: string) {
    if(filter != "tous") {
      console.log("this.ouvrages filterToStatut", this.ouvrages)
      console.log("filterToStatut", filter)
      this.ouvrages.filter(ouv =>{ouv.statut == filter})
      console.log("this.ouvrages filterToStatut", this.ouvrages)
    }
  }
}
