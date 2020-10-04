import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Ouvrage} from "../ouvrage";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class ModalComponent implements OnInit {

  action: boolean = true;
  ouvrage: Ouvrage = {
    ISBN: "string",
    _id: 2,
    auteur: "string",
    emplacementP: "string",
    genre: "string",
    maisonE: "string",
    photo: "string",
    statut: "string",
    titre: "string",
  };

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
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

}
