import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {NgbModalConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Ouvrage} from '../ouvrage';
import {OuvrageService} from '../ouvrage.service';
import {OuvragesListComponent} from '../ouvrages-list/ouvrages-list.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class ModalComponent {

  @Input()
  newOuvrage: Ouvrage = {
    ISBN: '',
    auteur: '',
    emplacementPhysique: '',
    genre: '',
    maisonEdition: '',
    photo: '',
    statut: 'disponible',
    titre: '',
  };

  formData = new FormData();

  @ViewChild('fileInput') el: ElementRef;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private ouvrageService: OuvrageService, public dialogRef: MatDialogRef<ModalComponent>) {
  }

  saveAdd(element: Ouvrage): void {
    if (element.titre === '' || element.genre === '' || element.ISBN === '' || element.maisonEdition === '' || element.auteur === '' || element.emplacementPhysique === '') {
      alert('Vous devez remplir tous les champs');
    } else {
      this.formData.append('titre', this.newOuvrage.titre);
      this.formData.append('auteur', this.newOuvrage.auteur);
      this.formData.append('statut', this.newOuvrage.statut);
      this.formData.append('emplacementPhysique', this.newOuvrage.emplacementPhysique);
      this.formData.append('maisonEdition', this.newOuvrage.maisonEdition);
      this.formData.append('ISBN', this.newOuvrage.ISBN);
      this.formData.append('genre', this.newOuvrage.genre);
      this.ouvrageService.addOuvrage(this.formData).subscribe();
      this.dialogRef.close(true);
    }

  }

  saveEdit(): void {
    this.ouvrageService.editOuvrage(this.data.ouvrage).subscribe(x => {
    });
    this.dialogRef.close(true);
  }

  uploadFile(event): void {
    if (event.target.files && event.target.files[0]) {
      this.formData.append('photo', event.target.files[0]);
    }
  }
}

