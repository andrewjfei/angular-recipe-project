import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService) {}

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
        return this.http.get('https://ng-complete-guide-b8aeb.firebaseio.com/recipes.json')
        .pipe(map(
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