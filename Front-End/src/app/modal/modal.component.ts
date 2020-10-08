import {Component, Inject, Input, OnInit} from '@angular/core';
import {NgbModalConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Ouvrage} from "../ouvrage";
import {OuvrageService} from "../ouvrage.service";
import {OuvragesListComponent} from "../ouvrages-list/ouvrages-list.component";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class ModalComponent {

  @Input()
  newOuvrage: Ouvrage = {
    ISBN: "",
    auteur: "",
    emplacementP: "",
    genre: "",
    maisonE: "",
    photo: "",
    statut: "disponible",
    titre: "",
  };
  //constructor(config: NgbModalConfig, private modalService: NgbModal, private ouvrageService: OuvrageService, private ouvrageComponent: OuvragesListComponent, private dashboardComponent: DashboardComponent) {
    // customize default values of modals used by this component tree
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private ouvrageService: OuvrageService,  public dialogRef: MatDialogRef<ModalComponent>) {}

  saveAdd(): void{
    console.log("this.newOuvrage",this.newOuvrage);
    this.ouvrageService.addOuvrage(this.newOuvrage).subscribe();
    this.dialogRef.close(true);
}

  saveEdit(): void{
    console.log("this.data",this.data)
    this.ouvrageService.editOuvrage(this.data).subscribe( x => {})
    this.dialogRef.close(true);
  }

}

