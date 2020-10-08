import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Ouvrage, OuvrageRespense} from './ouvrage';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OuvrageService {

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  listOuvrage: Ouvrage[];

  getOuvrages(titre: string, auteur: string, genre: string, statut: string): Observable<OuvrageRespense> {
    if(titre === null) {titre = '' }
    if(auteur === null) {auteur = '' }
    if(genre === null) {genre = '' }
    if(statut === null) {statut = '' }
    return this.http.get<OuvrageRespense>(`/api/ouvrage?titre=${titre}&genre=${genre}&auteur=${auteur}&statut=${statut}`, this.httpOptions);
  }

  deleteOuvrage(_id: number) {
    console.log('_id', _id);
    return this.http.delete<Ouvrage>(`/api/ouvrage/${_id}`);
  }

  editOuvrage(element: Ouvrage) {
    return this.http.put<Ouvrage>(`/api/ouvrage/${element._id}`, element);
  }

  addOuvrage(element: Ouvrage, ) {
    return this.http.post<Ouvrage>(`/api/ouvrage`, element);
  }

  changeStatut(element: Ouvrage) {
    console.log('changeStatut (element)', element);
    if (element.statut == 'disponible') {
      element.statut = 'Prêté';
    } else {
      element.statut = 'disponible';
    }
    return this.http.put<Ouvrage>(`/api/ouvrage/${element._id}`, element);
  }
}
