import { Component, OnInit } from '@angular/core';
import { iFilm } from '../../interfaces/i-film';
import { FilmsService } from '../../services/films.service';
import { FavoritesService } from './../../services/favorites.service';
import { AuthsrvService } from '../../auth/authsrv.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {
  films: iFilm[] = []; // Tutti i film
  favoriteFilms: iFilm[] = []; // Film preferiti
  activeTab: number = 1; // Imposta la scheda iniziale su "Tutti i Film"
  userId!: number;

  constructor(
    private filmsSvc: FilmsService,
    private favSvc: FavoritesService,
    private authSvc: AuthsrvService
  ) {}

  ngOnInit(): void {
    // Ottiene l'ID utente
    this.authSvc.user$.subscribe(user => {
      if (user) {
        this.userId = user.id;

        // Carica i film preferiti solo dopo aver ottenuto l'ID utente
        this.loadFavoriteFilms();
      }
    });

    // Carica tutti i film
    this.loadAllFilms();
  }

  loadAllFilms(): void {
    this.filmsSvc.getAllFilms().subscribe(films => {
      this.films = films;
    });
  }

  loadFavoriteFilms(): void {
    this.favSvc.getFavsById(this.userId).subscribe(favs => {
      this.favoriteFilms = favs.film;
    });
  }
}
