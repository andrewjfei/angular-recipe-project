import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { Actions, ofType } from '@ngrx/effects';
import * as RecipesActions from '../recipes/store/recipes.actions';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class RecipesResolverService implements Resolve<Recipe[]> {

    constructor(
        private dataStorageService: DataStorageService, 
        private recipeService: RecipeService, 
        private store: Store<fromApp.AppState>,
        private actions: Actions
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // const recipes = this.recipeService.getRecipes();

        // if (recipes.length == 0) {
        //     return this.dataStorageService.fetchRecipes();
        // } else {
        //     return null;
        // }

        return this.store.select('recipes').pipe(
            take(1),
            map(
                recipesState => {
                    return recipesState.recipes;
                }
            ),
            switchMap(
                recipes => {
                    if (recipes.length === 0) {
                        this.store.dispatch(new RecipesActions.FetchRecipes());
                        return this.actions.pipe(
                            ofType(RecipesActions.SET_RECIPES),
                            take(1),
                        );
                    } else {
                        return of(recipes);
                    }
                }
            )
        )
    }
}