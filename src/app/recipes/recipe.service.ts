import { Injectable } from "@angular/core";
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        // new Recipe(
        //     'A Test Recipe', 
        //     'This is simply a test', 
        //     'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-puttanesca_1.jpg',
        //     [
        //         new Ingredient('Bread', 2),
        //         new Ingredient('Tomato Sauce', 1),
        //         new Ingredient('Chicken Nuggets', 10)
        //     ]
        //     ),
        // new Recipe(
        //     'Another Test Recipe', 
        //     'This is simply another test', 
        //     'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-puttanesca_1.jpg',
        //     [
        //         new Ingredient('Pasta', 1),
        //         new Ingredient('White Pasta Sauce', 1),
        //         new Ingredient('Fries', 20)
        //     ]
        //     )
      ];

      constructor(
          private shoppingListService: ShoppingListService, 
          private store: Store<fromApp.AppState>
        ) {}

      setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes() {
        return this.recipes.slice();
      }

      getRecipe(index: number) {
        return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
        // this.shoppingListService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe) {
          this.recipes.push(recipe);
          this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
          this.recipes[index] = newRecipe;
          this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
          this.recipes.splice(index, 1);
          this.recipesChanged.next(this.recipes.slice());
      }

}