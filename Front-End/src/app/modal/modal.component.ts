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

  /*########################## File Upload ########################*/
  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
  editFile = true;
  removeUpload = false;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private ouvrageService: OuvrageService,  public dialogRef: MatDialogRef<ModalComponent>) {}

  saveAdd(element: Ouvrage): void{
    if(element.titre === '' || element.genre === '' || element.ISBN === '' || element.maisonEdition === '' || element.auteur === '' || element.emplacementPhysique === ''){
      alert("Vous devez remplir tous les champs");
    }else{
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

  saveEdit(): void{
    console.log('this.data', this.data);
    this.ouvrageService.editOuvrage(this.data).subscribe( x => {});
    this.dialogRef.close(true);
  }

  uploadFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.formData.append('photo', event.target.files[0])
    }

    // const reader = new FileReader(); // HTML5 FileReader API
    // const file = event.target.files[0];
    // if (event.target.files && event.target.files[0]) {
    //   reader.readAsDataURL(file);
    //
    //   // When file uploads set it to file formcontrol
    //   reader.onload = () => {
    //     this.imageUrl = reader.result;
    //     this.newOuvrage.append('',)
    //     this.newOuvrage.photo = reader.result;
    //     this.editFile = false;
    //     this.removeUpload = true;
    //   };
    // }
  }
}

