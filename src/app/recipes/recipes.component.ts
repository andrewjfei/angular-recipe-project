import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  private recipeService: RecipeService;

  selectedRecipe: Recipe;

  constructor(recipeServie: RecipeService) {
    this.recipeService = recipeServie;
  }

  ngOnInit() {
    this.recipeService.recipeSelected
      .subscribe(
        (recpie: Recipe) => {
          this.selectedRecipe = recpie;
        }
      )
  }

}
