import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardFilmComponent } from './card-film/card-film.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    CardFilmComponent
  ],
  imports: [
    CommonModule,

  ],
  exports:[
    CardFilmComponent,
  ]
})
export class SharedModule { }
