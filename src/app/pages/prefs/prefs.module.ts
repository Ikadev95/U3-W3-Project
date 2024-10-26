import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrefsRoutingModule } from './prefs-routing.module';
import { PrefsComponent } from './prefs.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    PrefsComponent
  ],
  imports: [
    CommonModule,
    PrefsRoutingModule,
    SharedModule
  ]
})
export class PrefsModule { }
