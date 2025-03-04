import React, { useState } from "react";
import Recipe from "./Recipe";

function Food({ recipes, setRecipes }) {

    const createRecipe = () => {
        const recipe = {};
        recipe.id = `recipe${Date.now()}`;
        recipe.name = "";
        recipe.serves = 1;
        recipe.ingredients = [];
        const recipesCopy = [...recipes];
        recipesCopy.push(recipe);
        setRecipes(recipesCopy);
    };

    const deleteRecipe = (id) => {
        const recipesCopy = [...recipes];
        recipesCopy.splice(recipes.findIndex((item) => item.id === id), 1);
        setRecipes(recipesCopy);
    }
    
    return (
        <div className="Food">
            <h1>Recipes</h1>
            <ol>
                {recipes.map((recipe) => 
                    <li>
                        <Recipe 
                            id={recipe.id}
                            name={recipe.name}
                            serves={recipe.serves}
                            ingredients={recipe.ingredients}
                            recipes={recipes}
                            setRecipes={setRecipes}
                            deleteRecipe={deleteRecipe}
                        />
                    </li>
                    )
                }
            </ol>
            <button className="createRecipe" onClick={createRecipe}>Create Recipe</button>
        </div>
    );
}

export default Food;