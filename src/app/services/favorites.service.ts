import { Injectable } from '@angular/core';
import { iFav } from '../interfaces/i-fav';
import { iFilm } from '../interfaces/i-film';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, filter, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private apiUrl = 'http://localhost:3000/favorites';


  favObj: iFav = {
    userId: -1,
    film: []
  };


  private favSubject = new BehaviorSubject<iFav>(this.favObj);
  favs$ = this.favSubject.asObservable();

  constructor(private http: HttpClient) {}


  loadUserFavorites(userId: number): void {
    this.getFavsById(userId).pipe(
      filter(Boolean),
      tap((favs) => {
        console.log(favs)
        this.favObj = favs;
        this.favSubject.next(this.favObj);
      })
    ).subscribe();
  }


  addToFavs(film: iFilm) {
    const filmExists = this.favObj.film.some(f => f.id === film.id);

    if (!filmExists) {
      this.favObj.film.push(film);
      console.log('Film aggiunto ai preferiti:', film);
    } else {

      this.favObj.film = this.favObj.film.filter(f => f.id !== film.id);
      console.log('Film rimosso dai preferiti:', film);
    }


    this.favSubject.next(this.favObj);
    this.AddFavToDb();
    console.log(this.favObj);
  }

  removeToFavsById(userId: number): Observable<iFav> {
    return this.http.delete<iFav>(`${this.apiUrl}/${userId}`);
  }

  AddFavToDb() {
    this.getFavsById(this.favObj.userId).subscribe(existingFavs => {
      if (existingFavs) {
        this.removeToFavsById(this.favObj.userId).subscribe(() => {
          this.postFavsToDb();
        });
      } else {
        this.postFavsToDb();
      }
    });
  }

  private postFavsToDb() {
    this.http.post<iFav>(this.apiUrl, this.favObj).subscribe(() => {
      console.log('Preferiti aggiunti al database:', this.favObj);
    });
  }

  getAllFavs(): Observable<iFav[]> {
    return this.http.get<iFav[]>(this.apiUrl);
  }

  getFavsById(userId: number): Observable<iFav> {
    return this.http.get<iFav>(`${this.apiUrl}/${userId}`);
  }

  resetFavorites(id: number): void {
    // Imposta l'oggetto dei preferiti vuoto per l'utente specificato
    this.favObj = {
      userId: id,
      film: []
    };

    console.log('Resetting favorites for user:', id);

    // Notifica i componenti ascoltatori
    this.favSubject.next(this.favObj);

    // Invia i preferiti aggiornati al database
    this.postFavsToDb();
  }

}
