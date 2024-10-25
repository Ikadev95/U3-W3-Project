import { Injectable } from '@angular/core';
import { iFav } from '../interfaces/i-fav';
import { iFilm } from '../interfaces/i-film';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private apiUrl = 'http://localhost:3000/favorites';

  favObj: iFav = {
    userId: -1,
    film: []
  }

  constructor( private http:HttpClient) { }


  addToFavs(film:iFilm){

    const filmExists = this.favObj.film.some(f => f.id === film.id);

    if (!filmExists) {
      this.favObj.film.push(film);
      console.log('Film aggiunto ai preferiti:', film);
    } else {
      this.removeToFavsById(this.favObj.userId)
    }

    console.log(this.favObj);
  }

  removeToFavsById(userId:number){
    return this.http.delete<iFav>(`${this.apiUrl}/${userId}`);
  }

  AddFavToDb() {
    this.http.post<iFav>(environment.filmFavUrl, this.favObj).subscribe();
    this.favObj.film = []
  }


  getAllFavs(){
    return this.http.get<iFav>(environment.filmFavUrl)
  }

  getFavsById(userId: number) {
    return this.http.get<iFav>(`${this.apiUrl}/${userId}`);
  }

  }

