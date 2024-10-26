import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrefsComponent } from './prefs.component';

const routes: Routes = [{ path: '', component: PrefsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrefsRoutingModule { }
