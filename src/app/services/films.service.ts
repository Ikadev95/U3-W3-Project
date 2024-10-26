import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { iFilm } from '../interfaces/i-film';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(private http: HttpClient) { }

  // Ottieni tutti i film
  getAllFilms() {
    return this.http.get<iFilm[]>(environment.filmsUrl);
  }

  // Ottieni un film per ID
  getFilmById(id: number) {
    return this.http.get<iFilm>(`${environment.filmsUrl}/${id}`); // Assicurati che la tua API supporti questo endpoint
  }
}
