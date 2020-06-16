import { Actions, Effect, ofType} from '@ngrx/effects';
import * as RecipesActions from './recipes.actions';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { pipe } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipesEffects {

    @Effect()
    fetchRecipes = this.actions.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(
            () => {
                return this.http.get('https://ng-complete-guide-b8aeb.firebaseio.com/recipes.json');
            }
        ),
        map(
            (recipes: Recipe[]) => {
                console.log(recipes);
                return recipes.map(
                    recipe => {
                        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                    }
                );
            }
        ),
        map(
            recipes => {
                return new RecipesActions.SetRecipes(recipes);
            }
        )
    
    );

    @Effect({dispatch: false})
    storeRecipes = this.actions.pipe(
        ofType(RecipesActions.STORE_RECIPES),pipe(
            withLatestFrom(
                this.store.select('recipes')
            ),  
            switchMap(
                ([actionData, recipesState]) => {
                    console.log(recipesState.recipes);
                    return this.http.put('https://ng-complete-guide-b8aeb.firebaseio.com/recipes.json', recipesState.recipes)
                }
            )
        )
    )

    constructor(
        private actions: Actions, 
        private http: HttpClient, 
        private store: Store<fromApp.AppState>
    ) {}
}