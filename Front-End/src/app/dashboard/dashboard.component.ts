import {Component, Input, OnInit} from '@angular/core';
import {Ouvrage} from "../ouvrage";
import {OuvrageService} from "../ouvrage.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ouvrages: Ouvrage[] = [];

  ouvrageDisp: number;

  ouvragePre: number;

  status: string = "tous"

  dataSource: MatTableDataSource<Ouvrage>;

  @Input()
  preter: string = "Prêté";
  @Input()
  disponible: string = "disponible";
  @Input()
  tous: string = "tous";


    auteur = "";
    genre = "";
    statut = "";
    titre = "";


  constructor(private ouvrageService: OuvrageService, public dialog: MatDialog) { };

  ngOnInit() {
    this.getOuvrages();
  }

 setList(statut: string): void {
   this.status = statut;
   this.getOuvrages();
}

  getOuvrages(): void {
    this.ouvrageService.getOuvrages(this.titre, this.auteur, this.genre, this.statut)
      .subscribe(res => {
        this.ouvrageDisp = res.data.filter(ouvrage => ouvrage.statut == "disponible").length;
        this.ouvragePre = res.data.filter(ouvrage => ouvrage.statut == "Prêté").length;

        if(this.status != "tous"){
          this.ouvrages = res.data.filter(ouvrage => ouvrage.statut == this.status);
        }else{
          this.ouvrages = res.data;
        }
        this.dataSource = new MatTableDataSource(this.ouvrages);
      });
  }

  deleteOuvrage(element: Ouvrage) : void {
    this.ouvrageService.deleteOuvrage(element._id)
      .subscribe(res => {
        if(this.ouvrages.length != 1) {
          this.getOuvrages();
        }else{
          this.ouvrages = [];
          this.ouvrageDisp = 0;
          this.ouvragePre = 0;
          this.dataSource = new MatTableDataSource(this.ouvrages);
        }

      });
  }

  changeStatut(element: Ouvrage): void{
    this.ouvrageService.changeStatut(element)
      .subscribe(res => {
        this.getOuvrages();
        // this.dashboardComponent.getOuvrages();

      });
  }

  editOuvrage(element: Ouvrage) {

   const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        ouvrage: element,
        type: "edit"
      }
    });
   dialogRef.afterClosed().subscribe(result => {
      this.getOuvrages();
    });

  }

  addOuvrage() {
    const dialogRef = this.dialog.open(ModalComponent, {

      data: {
        type: "add"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getOuvrages();
    });

  }
  private filterToStatut(filter: string) {
    if(filter != "tous") {
      console.log("this.ouvrages-list filterToStatut", this.ouvrages);
      console.log("filterToStatut", filter);
      this.ouvrages.filter(ouv =>{ouv.statut == filter});
      console.log("this.ouvrages-list filterToStatut", this.ouvrages);
    }
  }

  detailOuvrage($event: Ouvrage) {
    this.dialog.open(ModalComponent, {
      data: {
        ouvrage: $event,
        type: "detail"
      }
    });
  }

  filterFormOuvrage($event: any) {
    this.ouvrageService.getOuvrages($event.titre, $event.auteur, $event.genre, $event.statut)
      .subscribe(res => {
        this.ouvrageDisp = res.data.filter(ouvrage => ouvrage.statut == "disponible").length;
        this.ouvragePre = res.data.filter(ouvrage => ouvrage.statut == "Prêté").length;

        if(this.status != "tous"){
          this.ouvrages = res.data.filter(ouvrage => ouvrage.statut == this.status);
        }else{
          this.ouvrages = res.data;
        }
        this.dataSource = new MatTableDataSource(this.ouvrages);
      });
  }
}
