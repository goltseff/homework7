import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { VERSION  } from '@angular/core';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('HttpInterceptorService');
    req = req.clone({
      setHeaders: {'X-Frontend-By': 'angular ' + VERSION.full}
    });
    return next.handle(req);
  }
}
