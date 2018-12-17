import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor (private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
        .pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log(event);
                }
            }, err => {
                if (err instanceof HttpErrorResponse) {
                    console.log(err);
                    if (err.status === 401) {
                        console.log('Unauthorized');
                        this.router.navigateByUrl('login');
                    }
                    if (err.status === 403) {
                        console.log('Forbidden');
                        this.router.navigateByUrl('login');
                    }
                }
            })
        );
    }

}

