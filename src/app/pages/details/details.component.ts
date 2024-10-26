import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from '../../services/films.service';
import { iFilm } from '../../interfaces/i-film';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  film!: iFilm;

  constructor(private route: ActivatedRoute, private filmsService: FilmsService) {}

  ngOnInit() {
    // Recupera l'ID del film dalla rotta
    this.route.paramMap.subscribe(params => {
      const filmId = +params.get('id')!;
      this.getFilmDetails(filmId);
    });
  }

  getFilmDetails(id: number) {
    this.filmsService.getFilmById(id).subscribe(film => {
      this.film = film;
    });
  }
}
