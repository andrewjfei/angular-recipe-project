import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthGaurd implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean> | boolean {
        return this.authService.user.pipe(
            take(1),
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