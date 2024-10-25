import { Component, Input, OnInit } from '@angular/core';
import { iFilm } from '../../interfaces/i-film';
import { FavoritesService } from '../../services/favorites.service';
import { AuthsrvService } from '../../auth/authsrv.service';
import { iFav } from '../../interfaces/i-fav';

@Component({
  selector: 'app-card-film',
  templateUrl: './card-film.component.html',
  styleUrl: './card-film.component.scss'
})
export class CardFilmComponent implements OnInit {
  @Input() film!: iFilm;
  fav = true;
  favObj!: iFav

  constructor(private favSvc: FavoritesService, private authSvc: AuthsrvService) {}

  ngOnInit(): void {
    this.favObj = this.favSvc.favObj

    this.authSvc.user$.subscribe(user => {
      if (user) {
        this.favObj.userId = user.id;
      }
    });
  }

  addToFav(): void {
    this.favSvc.addToFavs(this.film)
    this.fav = !this.fav;}


}
