import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { iAccessData } from '../interfaces/i-access-data';
import { iUser } from '../interfaces/i-user';
import { iLoginRequest } from '../interfaces/i-login-request';
import { FavoritesService } from '../services/favorites.service';


@Injectable({
  providedIn: 'root'
})
export class AuthsrvService {

  jwtHelper: JwtHelperService = new JwtHelperService();

  registerUrl: string = environment.registerUrl;
  loginUrl: string = environment.loginUrl;
  autoLogoutTimer: any;

  authSubject$ = new BehaviorSubject<iAccessData | null>(null);


  user$ = this.authSubject$.asObservable()
    .pipe(
      tap(accessData => this.isLoggedIn == !!accessData),
      map(accessData => accessData?.user)
    );

  isLoggedIn$ = this.authSubject$
    .pipe(map(accessData => !!accessData));

  isLoggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private svc: FavoritesService
  ) {
    this.restoreUser();
  }


register(newUser: Partial<iUser>) {
  return this.http.post<iAccessData>(this.registerUrl, newUser)
    .pipe(
      tap((data) => {

        const userId = data.user.id;
        this.svc.resetFavorites(userId);
      })
    );
}


  login(authData: iLoginRequest) {
    console.log(authData);
    return this.http.post<iAccessData>(this.loginUrl, authData)
      .pipe(tap(data => {
        this.authSubject$.next(data);
        localStorage.setItem('data', JSON.stringify(data));
        const expDate = this.jwtHelper.getTokenExpirationDate(data.accessToken);
        if (!expDate) return;
        this.autoLogout(expDate);
      }));
  }


  logout() {
    this.svc.updateFavsToDb();
    this.authSubject$.next(null);
    localStorage.removeItem('data');
    this.router.navigate(['/auth/login']);

  }


  autoLogout(expDate: Date) {
    const expMs = expDate.getTime() - new Date().getTime();
    this.autoLogoutTimer = setTimeout(() => {
      this.svc.updateFavsToDb();
      this.logout();
    }, expMs);
  }


  restoreUser() {
    const user: string | null = localStorage.getItem('data');
    if (!user) return;

    const data: iAccessData = JSON.parse(user);


    if (this.jwtHelper.isTokenExpired(data.accessToken)) {
      localStorage.removeItem('data');
      return;
    }

    this.authSubject$.next(data);
  }
}
