import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as RecipesActions from '../recipes/store/recipes.actions';

@Injectable()
export class DataStorageService {

    constructor(
        private http: HttpClient, 
        private recipeService: RecipeService, 
        private store: Store<fromApp.AppState>
    ) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-complete-guide-b8aeb.firebaseio.com/recipes.json', recipes)
        .subscribe(
            response => {
                console.log(response);
            }
        )
    }

    fetchRecipes() {

        // take operator allows us to subscribe n times and then automatically unsubscribes
        return this.http.get('https://ng-complete-guide-b8aeb.firebaseio.com/recipes.json').pipe(
        map(
            (recipes: Recipe[]) => {
                return recipes.map(
                    recipe => {
                        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                    }
                );
            }
        ),
        tap(
            (recipes: Recipe[]) => {
                // this.recipeService.setRecipes(recipes);
                this.store.dispatch(new RecipesActions.SetRecipes(recipes));
            }
        ));
    }

}