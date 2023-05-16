import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../Services/api.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private api: ApiService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.api.getToken();

    if (token){
      const stringToken : string= token.toString()

      request = request.clone({
        // setHeaders: (Authorization: `Bearer ${token}` )
        headers: request.headers.set('Authorization', `Bearer ${stringToken}`),
    });

    } 

    return next.handle(request);
  }
}
