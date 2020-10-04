import {Component, Input, OnInit} from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Ouvrage} from "../ouvrage";
import {OuvrageService} from "../ouvrage.service";
import {OuvragesComponent} from "../ouvrages/ouvrages.component";

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
  boolAdd: boolean;

  @Input()
  boolEdit: boolean;

  @Input()
  iconAdd: string = "add";

  @Input()
  iconEdit: string = "create";

  @Input()
  ouvrage: Ouvrage = {
    ISBN: "",
    _id: 0,
    auteur: "",
    emplacementP: "",
    genre: "",
    maisonE: "",
    photo: "",
    statut: "",
    titre: "",
  };


  constructor(config: NgbModalConfig, private modalService: NgbModal, private ouvrageService: OuvrageService,private ouvrageComponent: OuvragesComponent) {
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

  editOrAddOuvrage(element: Ouvrage, addOuvrgae: boolean) : void {
    console.log("editOrAddOuvrage", element)
    if(addOuvrgae){this.ouvrageService.addOuvrage(element)
      .subscribe(res =>   this.ouvrageComponent.getOuvrages());
    }else{
      this.ouvrageService.editOuvrage(element)
        .subscribe(res =>   this.ouvrageComponent.getOuvrages());
    }
    }

}

