import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-ouvrage-form',
  templateUrl: './ouvrage-form.component.html',
  styleUrls: ['./ouvrage-form.component.css']
})

export class OuvrageFormComponent {

  form: FormGroup;

  @Output() filterOuvrage = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      titre: [''],
      auteur: [''],
      statut: [''],
      genre: [''],
    });
  }

  filterOuvrages() {
    this.filterOuvrage.emit(this.form.value);
  }

  reset() {
    this.form.reset();
  }

}
