import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { iFilm } from '../interfaces/i-film';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(private http:HttpClient) { }

  getAllFilms(){
    return this.http.get<iFilm[]>(environment.filmsUrl)
  }

}
