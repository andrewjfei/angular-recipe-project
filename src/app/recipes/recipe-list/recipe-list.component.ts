import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as RecipesActions from '../../recipes/store/recipes.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private recipeService: RecipeService;

  recipes: Recipe[];
  subscription: Subscription;

  constructor(
    recipeService: RecipeService, 
    private router: Router, 
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { 
    this.recipeService = recipeService;
  }

  ngOnInit() {
    this.subscription = this.store.select('recipes')
    .pipe(
      map(
        recipesState => {
          return recipesState.recipes;
        }
      )
    )
    .subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    // this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
