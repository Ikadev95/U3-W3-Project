import { Component, Input, OnInit } from '@angular/core';
import { iFilm } from '../../interfaces/i-film';
import { FavoritesService } from '../../services/favorites.service';
import { AuthsrvService } from '../../auth/authsrv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-film',
  templateUrl: './card-film.component.html',
  styleUrls: ['./card-film.component.scss']
})
export class CardFilmComponent implements OnInit {
  @Input() film!: iFilm;

  fav: boolean = true;

  constructor(private favSvc: FavoritesService, private authSvc: AuthsrvService, private router: Router) {}

  ngOnInit(): void {

    this.favSvc.favs$.subscribe(favObj => {
      this.fav = favObj.film.some(f => f.id === this.film.id);
    });

  }

  updateToFav(): void {
    this.favSvc.updateFavs(this.film);
  }
  details() {
    this.router.navigate(['/details', this.film.id]); // Passa l'ID del film
}

}
