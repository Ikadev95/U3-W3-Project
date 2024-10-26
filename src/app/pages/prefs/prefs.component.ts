import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { iFilm } from '../../interfaces/i-film';
import { AuthsrvService } from '../../auth/authsrv.service';

@Component({
  selector: 'app-prefs',
  templateUrl: './prefs.component.html',
  styleUrl: './prefs.component.scss'
})
export class PrefsComponent implements OnInit{
  films:iFilm[] = []
  id!:number
  constructor(private prefSvc: FavoritesService, private authSvc: AuthsrvService){}

  ngOnInit(): void {

    this.prefSvc.favs$.subscribe(
      film => {
        this.films = film.film
      }
    )
    this.authSvc.user$.subscribe(user => {
      if (user) {this.id = user.id}
    })
  }

}
