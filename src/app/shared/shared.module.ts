import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardFilmComponent } from './card-film/card-film.component';


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
