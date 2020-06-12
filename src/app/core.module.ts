import { NgModule } from "@angular/core";
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { DataStorageService } from './shared/data-storage.service';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { AuthService } from './auth/auth.service';
import { AuthGaurd } from './auth/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
    providers: [
        ShoppingListService,
        RecipeService,
        DataStorageService,
        RecipesResolverService,
        AuthService,
        AuthGaurd,
        { 
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService, 
        multi: true 
        }
    ]
})

export class CoreModule {}