import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Ouvrage} from "../ouvrage";
import {OuvrageService} from "../ouvrage.service";
import {MatTableDataSource} from "@angular/material/table";
import {DashboardComponent} from "../dashboard/dashboard.component";


@Component({
  selector: 'app-ouvrages',
  templateUrl: './ouvrages-list.component.html',
  styleUrls: ['./ouvrages-list.component.css']
})
export class OuvragesListComponent {

  ouvrages: Ouvrage[] = [];
  status: string;
  displayedColumns: string[] = ['titre', 'auteur', 'genre', 'statut', 'changeStatut', 'modifier', 'supprimer', 'detail'];

  @Input()
  dataSource: MatTableDataSource<Ouvrage>;

  @Output()
  editItemOuvrage = new EventEmitter<Ouvrage>();

  @Output()
  deleteItemOuvrage = new EventEmitter<Ouvrage>();

  @Output()
  detailItemOuvrage = new EventEmitter<Ouvrage>();

  @Output()
  changeItemStatut = new EventEmitter<Ouvrage>();


  constructor(private ouvrageService: OuvrageService, private dashboardComponent: DashboardComponent) { }

  deleteOuvrage(element: Ouvrage){
    this.deleteItemOuvrage.emit(element);
  }

  editOuvrage(element: Ouvrage){
    this.editItemOuvrage.emit(element);
  }

  detailOuvrage(element: Ouvrage){
    this.detailItemOuvrage.emit(element);
  }

  changeStatut(element: Ouvrage){
    this.changeItemStatut.emit(element);
  }


}
