import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Ouvrage, OuvrageRespense} from "./ouvrage";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OuvrageService {

  constructor(private http: HttpClient,) {
  };
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getOuvrages(): Observable<OuvrageRespense> {
    return this.http.get<OuvrageRespense>("/ouvrage", this.httpOptions);
  }

  getOuvrage(_id: number): Observable<Ouvrage> {

    return this.http.get<Ouvrage>(`/${_id}`).pipe(
      catchError(this.handleError<Ouvrage>(`getOuvrage id=${_id}`))
    );
  }

  deleteOuvrage(_id: number) {
    console.log("_id", _id);
    return this.http.delete<Ouvrage>(`/ouvrage/${_id}`)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };

  }

  editOuvrage(element: Ouvrage) {
    return this.http.put<Ouvrage>(`/ouvrage/${element._id}`, element)
  }

  addOuvrage(element: Ouvrage) {
    return this.http.post<Ouvrage>(`/ouvrage`, element)
  }
}
