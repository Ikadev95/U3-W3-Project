import { Injectable } from '@angular/core';
import { iFav } from '../interfaces/i-fav';
import { iFilm } from '../interfaces/i-film';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private apiUrl = 'http://localhost:3000/favorites';

  // Oggetto per gestire i preferiti dell'utente
  favObj: iFav = {
    userId: -1,
    film: []
  };

  // Comportamento per tenere traccia degli aggiornamenti dei preferiti
  private favSubject = new BehaviorSubject<iFav>(this.favObj);
  favs$ = this.favSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Carica i preferiti dell'utente all'inizio
  loadUserFavorites(userId: number): void {
    this.getFavsById(userId).subscribe(
      (favs) => {
        if (favs) {
          this.favObj = favs; // Aggiorna il favObj con i preferiti caricati
          this.favSubject.next(this.favObj); // Notifica i componenti che ascoltano
          console.log('Preferiti caricati:', this.favObj);
        }
      }
    );
  }

  // Aggiungi un film ai preferiti
  addToFavs(film: iFilm) {
    const filmExists = this.favObj.film.some(f => f.id === film.id);

    if (!filmExists) {
      this.favObj.film.push(film);
      console.log('Film aggiunto ai preferiti:', film);
    } else {
      // Rimuovi il film dai preferiti
      this.favObj.film = this.favObj.film.filter(f => f.id !== film.id);
      console.log('Film rimosso dai preferiti:', film);
    }

    // Aggiorna il BehaviorSubject con il nuovo stato dei preferiti
    this.favSubject.next(this.favObj);
    this.AddFavToDb(); // Questa funzione aggiornerà il DB con i nuovi preferiti
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

  resetFavorites(): void {
    this.favObj = {
      userId: -1,
      film: []
    };
    this.favSubject.next(this.favObj); // Notifica i componenti che ascoltano
  }

}
