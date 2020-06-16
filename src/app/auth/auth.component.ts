import { Component, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AlertComponent } from '../shared/alert/alert.component';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  isLoginMode: boolean = false;
  isLoading: boolean = false;
  error: string = null;

  storeSub: Subscription;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe(
      authState => {
        this.isLoading = authState.loading;
        this.error = authState.authError;
      }
    );
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      // authObs = this.authService.login(email, password);
      this.store.dispatch(new AuthActions.LoginStart({ email: email, password: password }));
    } else {
      // authObs = this.authService.signup(email, password)
      this.store.dispatch(new AuthActions.SignupStart({ email: email, password: password }));
    }

    // authObs.subscribe(
    //   resData => {
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   errorMessage => {
    //     this.error = errorMessage;
    //     // this.showErrorAlert(errorMessage);
    //     this.isLoading = false;
    //   }
    // );

    form.reset();
  }

  // onHandleError() {
  //   this.error = null;
  //   this.isLoading = false;
  // }

  // private showErrorAlert(message: string) {
  //   const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

  //   const hostViewContainerRef = this.alertHost.viewContainerRef;

  //   hostViewContainerRef.clear();

  //   hostViewContainerRef.createComponent(alertCmpFactory);
  // }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }

}
