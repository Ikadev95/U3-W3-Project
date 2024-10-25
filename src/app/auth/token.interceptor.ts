import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AuthsrvService } from './authsrv.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authSvc: AuthsrvService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('[TokenInterceptor] Intercepted request:', request);

    return this.authSvc.authSubject$.pipe(
      switchMap(accessData => {
        console.log('[TokenInterceptor] Access Data ricevuto:', accessData);

        if (!accessData || !accessData.accessToken) {
          console.log('[TokenInterceptor] Nessun token disponibile, la richiesta procede senza header di autorizzazione.');
          return next.handle(request);
        }

        const newRequest = request.clone({
          headers: request.headers.append('Authorization', `Bearer ${accessData.accessToken}`)
        });

        console.log('[TokenInterceptor] Nuova richiesta con token:', newRequest);


        return next.handle(newRequest);
      })
    );
  }
}
