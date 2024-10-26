import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardFilmComponent } from './card-film/card-film.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CardFilmComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    CardFilmComponent,
    RouterModule
  ]
})
export class SharedModule { }
