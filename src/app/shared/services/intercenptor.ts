import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SharedService } from './shared.service';
import { getStoredAuthToken } from '../utils/auth-token';

@Injectable()
export class Interceptor implements HttpInterceptor {

    private static readonly PUBLIC_URL_PARTS = [
        'users/loginUser',
        'storeadmin/loginStoreadmin',
    ];

    constructor(
        private router: Router,
        public sharedService: SharedService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isPublic = Interceptor.PUBLIC_URL_PARTS.some((p) => request.url.includes(p));
        const token = getStoredAuthToken('admin_token');

        if (token && !isPublic) {
            request = request.clone({
                setHeaders: { Authorization: token },
            });
        }

        return next.handle(request).pipe(
            tap({
                error: (err) => {
                    if (err?.status === 401 && !isPublic) {
                        this.sharedService.showAlert(2, 'Session expired. Please login again.');
                        localStorage.removeItem('admin_token');
                        localStorage.removeItem('admin_data');
                        localStorage.removeItem('admin_pages');
                        if (!this.router.url.includes('/login')) {
                            this.router.navigate(['/login']);
                        }
                    }
                },
            }),
        );
    }
}
