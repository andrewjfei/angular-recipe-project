import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class AuthGaurd implements CanActivate {

    constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) {}

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean> | boolean {
        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.user;
            }),
            map(
            (user: User) => {
                const isAuth = !user ? false : true;

                if (isAuth) {
                    return true;
                }

                return this.router.createUrlTree(['/auth']);
            }
        ));
    }
}