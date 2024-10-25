import { Inject, Injectable, Injector } from '@angular/core';
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

    return this.authSvc.authSubject$.pipe(switchMap(accessData => {

      if(!accessData){
        return next.handle(request)
      }

      const newRequest = request.clone({
        headers: request.headers.append('Authorization',`Bearer ${accessData.accessToken}`)
      })

      return next.handle(newRequest);
    }))
  }
}
