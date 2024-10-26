import { FavoritesService } from './../../services/favorites.service';
import { iFilm } from '../../interfaces/i-film';
import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../../services/films.service';
import { AuthsrvService } from '../../auth/authsrv.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrl: './films.component.scss'
})
export class FilmsComponent implements OnInit {

  films:iFilm[] = []
  id!: number

  constructor(private FilmsSvc : FilmsService ,private prefSvc: FavoritesService, private authSvc: AuthsrvService){}

  ngOnInit(): void {

  this.authSvc.user$.subscribe(user => {
    if (user) {this.id = user.id}
  })
    this.FilmsSvc.getAllFilms().subscribe(
      films => { this.films = films}

    )
    this.prefSvc.getAllFavs().subscribe(
      favs => console.log(favs)
    )
    this.prefSvc.getFavsById(this.id).subscribe(
      fav => this.prefSvc.favObj = fav
    )
  }


}
