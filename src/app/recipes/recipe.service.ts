import { Injectable, EventEmitter } from "@angular/core";
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 'This is simply a test', 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-puttanesca_1.jpg'),
        new Recipe('Another Test Recipe', 'This is simply another test', 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-puttanesca_1.jpg')
      ];

      recipeSelected = new EventEmitter<Recipe>();

      getRecipes() {
          return this.recipes.slice();
      }

}