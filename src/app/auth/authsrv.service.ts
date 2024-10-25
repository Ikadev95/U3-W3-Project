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
  // Subject che memorizza i dati di accesso dell'utente, inclusi i token

  user$ = this.authSubject$.asObservable() // Osserva i dati dell'utente
    .pipe(
      tap(accessData => this.isLoggedIn == !!accessData), // Assegna true o false a seconda della presenza dei dati di accesso
      map(accessData => accessData?.user)
    );

  isLoggedIn$ = this.authSubject$
    .pipe(map(accessData => !!accessData)); // Verifica la presenza dello user e restituisce un booleano

  isLoggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private svc: FavoritesService
  ) {
    this.restoreUser(); // Ripristina i dati utente all'inizializzazione del servizio
  }

  // Metodo per registrare un nuovo utente
  register(newUser: Partial<iUser>) {
    return this.http.post<iAccessData>(this.registerUrl, newUser);
  }

  // Metodo per il login
  login(authData: iLoginRequest) {
    console.log(authData);
    return this.http.post<iAccessData>(this.loginUrl, authData)
      .pipe(tap(data => {
        this.authSubject$.next(data); // Inserisco i dati nel BehaviorSubject
        localStorage.setItem('data', JSON.stringify(data)); // Memorizzo i dati nel localStorage
        const expDate = this.jwtHelper.getTokenExpirationDate(data.accessToken); // Data di scadenza del token
        if (!expDate) return; // Se non c'è la data, blocco la funzione
        this.autoLogout(expDate); // Imposto il logout automatico in base alla scadenza del token
      }));
  }

  // Metodo per il logout
  logout() {
    this.authSubject$.next(null); // Rimuovo i dati dal BehaviorSubject
    localStorage.removeItem('data'); // Rimuovo i dati dal localStorage
    this.router.navigate(['/auth/login']); // Navigo alla pagina di login
    this.svc.AddFavToDb(); // Salva i preferiti
  }

  // Imposta il logout automatico quando il token scade
  autoLogout(expDate: Date) {
    const expMs = expDate.getTime() - new Date().getTime();
    this.autoLogoutTimer = setTimeout(() => {
      this.logout(); // Effettuo il logout quando scade il timer
    }, expMs);
  }

  // Ripristina i dati utente dal localStorage
  restoreUser() {
    const user: string | null = localStorage.getItem('data');
    if (!user) return; // Blocca se i dati non sono presenti

    const data: iAccessData = JSON.parse(user);

    // Controllo se il token è scaduto
    if (this.jwtHelper.isTokenExpired(data.accessToken)) {
      localStorage.removeItem('data'); // Corretto il nome della chiave da 'accessData' a 'data'
      return;
    }

    this.authSubject$.next(data); // Invia i dati al BehaviorSubject
  }
}
