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

    let AccessData = this.authSvc.authSubject$.getValue()

    if(!AccessData) return next.handle(request)

      const newRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${AccessData.accessToken}`)
      });

      return next.handle(newRequest);
  }
}
