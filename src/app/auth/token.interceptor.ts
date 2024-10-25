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
    if(request.url.includes('/login')){
      return next.handle(request)
    }

    return this.authSvc.authSubject$.pipe(switchMap(accessData => {

      if (!accessData || !accessData.accessToken) {
        return next.handle(request);
      }

      const newRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessData.accessToken}`)
      });

      return next.handle(newRequest);
    }));
  }
}
