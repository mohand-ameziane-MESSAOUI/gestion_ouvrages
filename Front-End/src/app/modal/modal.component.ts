import {Component, Input, OnInit} from '@angular/core';
import {NgbModalConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Ouvrage} from "../ouvrage";
import {OuvrageService} from "../ouvrage.service";
import {OuvragesComponent} from "../ouvrages/ouvrages.component";
import {DashboardComponent} from "../dashboard/dashboard.component";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class ModalComponent implements OnInit {
  @Input()
  addOuvrgae: boolean;

  @Input()
  isDetail: boolean = true;

  @Input()
  boolAdd: boolean;

  @Input()
  boolEdit: boolean;

  @Input()
  boolDetail: boolean;

  @Input()
  iconAdd: string = "add";

  @Input()
  iconEdit: string = "create";

  @Input()
  iconDetail: string = "reorder";

  @Input()
  ouvrage: Ouvrage = {
    ISBN: "",
    _id: 0,
    auteur: "",
    emplacementP: "",
    genre: "",
    maisonE: "",
    photo: "",
    statut: "disponible",
    titre: "",
  };

  constructor(config: NgbModalConfig, private modalService: NgbModal, private ouvrageService: OuvrageService, private ouvrageComponent: OuvragesComponent, private dashboardComponent: DashboardComponent) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content) {
    console.log("this.ouvrage", this.ouvrage)
    this.modalService.open(content);
  }

  ngOnInit(): void {
  }

  editOrAddOuvrage(element: Ouvrage, addOuvrgae: boolean): void {
    console.log("editOrAddOuvrage", element)
    if (addOuvrgae) {
      this.ouvrageService.addOuvrage(element)
        .subscribe(res => {
          this.ouvrageComponent.getOuvrages();
          this.dashboardComponent.getOuvrages()

        });
    } else {
      this.ouvrageService.editOuvrage(element)
        .subscribe(res => this.ouvrageComponent.getOuvrages());
    }
  }

  setIsDetail(bool: boolean) {
    this.isDetail = bool
  }
}

