import { Injectable, EventEmitter } from "@angular/core";
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe(
            'A Test Recipe', 
            'This is simply a test', 
            'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-puttanesca_1.jpg',
            [
                new Ingredient('Bread', 2),
                new Ingredient('Tomato Sauce', 1),
                new Ingredient('Chicken Nuggets', 10)
            ]
            ),
        new Recipe(
            'Another Test Recipe', 
            'This is simply another test', 
            'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-puttanesca_1.jpg',
            [
                new Ingredient('Pasta', 1),
                new Ingredient('White Pasta Sauce', 1),
                new Ingredient('Fries', 20)
            ]
            )
      ];

      constructor(private shoppingListService: ShoppingListService) {}

      recipeSelected = new EventEmitter<Recipe>();

      getRecipes() {
          return this.recipes.slice();
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
      }

}