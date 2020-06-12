import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';
import { User } from './user.model';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
         // take operator allows us to subscribe n times and then automatically unsubscribes
         return this.authService.user.pipe(
            take(1), 
            exhaustMap(
                (user: User) => {

                    if (!user) {
                        return next.handle(req);
                    }

                    const modifiedReq = req.clone({ 
                        params: new HttpParams().set('auth', user.token) 
                    });

                    return next.handle(modifiedReq);
                }
            ));
    }
}