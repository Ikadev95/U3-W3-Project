import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateChild } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { GuestGuard } from './auth/guards/guest.guard';

const routes: Routes = [
  {path:'', redirectTo: "auth", pathMatch:"full"},
  { path: 'films', loadChildren: () => import('./pages/films/films.module').then(m => m.FilmsModule), canActivate:[AuthGuard] },
  { path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule), canActivate:[AuthGuard] },
  { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule), canActivate:[AuthGuard] },
  { path: 'auth',loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate: [GuestGuard],
    canActivateChild: [GuestGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
