import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Injectable()
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

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
                this.recipeService.setRecipes(recipes);
            }
        ));
    }

}