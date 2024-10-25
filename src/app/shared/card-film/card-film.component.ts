import { Component, Input, OnInit } from '@angular/core';
import { iFilm } from '../../interfaces/i-film';
import { FavoritesService } from '../../services/favorites.service';
import { AuthsrvService } from '../../auth/authsrv.service';

@Component({
  selector: 'app-card-film',
  templateUrl: './card-film.component.html',
  styleUrls: ['./card-film.component.scss']
})
export class CardFilmComponent implements OnInit {
  @Input() film!: iFilm;

  fav: boolean = true;

  constructor(private favSvc: FavoritesService, private authSvc: AuthsrvService) {}

  ngOnInit(): void {

    this.favSvc.favs$.subscribe(favObj => {

      this.fav = favObj.film.some(f => f.id === this.film.id);
    });


    this.authSvc.user$.subscribe(user => {
      if (user) {
        this.favSvc.favObj.userId = user.id;
        this.favSvc.loadUserFavorites(user.id);
      }
    });
  }

  addToFav(): void {
    this.favSvc.addToFavs(this.film);
  }
}
