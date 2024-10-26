import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { iFilm } from '../../interfaces/i-film';
import { AuthsrvService } from '../../auth/authsrv.service';

@Component({
  selector: 'app-prefs',
  templateUrl: './prefs.component.html',
  styleUrls: ['./prefs.component.scss'] // Corretto il nome da "styleUrl" a "styleUrls"
})
export class PrefsComponent implements OnInit {
  films: iFilm[] = [];
  id!: number;

  constructor(private prefSvc: FavoritesService, private authSvc: AuthsrvService) {}

  ngOnInit(): void {
    // Carica i preferiti dell'utente corrente
    this.authSvc.user$.subscribe(user => {
      if (user) {
        this.id = user.id;
        this.prefSvc.loadUserFavorites(this.id); // Carica i preferiti quando l'utente è disponibile
      }
    });

    // Iscriviti ai cambiamenti nei preferiti
    this.prefSvc.favs$.subscribe(favObj => {
      this.films = favObj.film; // Crea una copia dell'array di film
    });
  }
}
