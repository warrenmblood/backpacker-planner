import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

function Recipe({ id, name, serves, ingredients, recipes, setRecipes, deleteRecipe }) {

    const [editing, setEditing] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const edit = (event) => {
        setEditing(true);
    };

    const save = (data, event) => {
        const recipesCopy = [...recipes];
        const saving = recipesCopy[recipesCopy.findIndex((item) => item.id === id)];
        saving.name = data["name"];
        saving.serves = data["serves"];
        saving.ingredients.forEach((item) => {
            item.name = data[item.id + "/name"];
            item.quantity = data[item.id + "/quantity"];
            item.unit = data[item.id + "/unit"];
        });
        setRecipes(recipesCopy);
        setEditing(false);
    };

    const addIngredient = (event) => {
        event.preventDefault();  // stop the form from submitting
        const recipesCopy = [...recipes];
        const ingredient = {};
        ingredient.id = `ingredient${Date.now()}`;
        ingredient.name = "";
        ingredient.quantity = 0;
        ingredient.unit = "";
        recipesCopy[recipesCopy.findIndex((item) => item.id === id)].ingredients.push(ingredient);
        setRecipes(recipesCopy);
    };

    const removeIngredient = (ingredientId, event) => {
        event.preventDefault();  // stop the form from submitting
        const recipesCopy = [...recipes];
        const rec = recipesCopy[recipesCopy.findIndex((item) => item.id === id)];
        rec.splice(rec.findIndex((item) => item.id === ingredientId), 1);
        setRecipes(recipesCopy);
    };

    return (
        <div className="Recipe">
            <form onSubmit={handleSubmit(save)} className="recipe-form">
                <div>
                    {editing ?
                        <input
                            {...register("name")}
                            type="text"
                            defaultValue={name}
                        />
                        :
                        <h3>{name}</h3>
                    }
                </div>
                <div>
                    <p>Serves</p>
                    <div>
                        {editing ?
                            <input
                                {...register("serves")}
                                type="number"
                                defaultValue={serves}
                            />
                            :
                            <div>{serves}</div>
                        }
                    </div>
                </div>
                <ol>
                    {ingredients.map((ingredient) =>
                        <li>
                            {editing ?
                                <div>
                                    <input
                                        {...register(ingredient.id + "/name")}
                                        type="text"
                                        defaultValue={ingredient.name}
                                    />
                                    <input 
                                        {...register(ingredient.id + "/quantity")}
                                        type="number"
                                        defaultValue={ingredient.quantity}
                                    />
                                    <input
                                        {...register(ingredient.id + "/unit")}
                                        type="text"
                                        defaultValue={ingredient.unit}
                                    />
                                </div>
                                :
                                <div>
                                    <span>{ingredient.name}</span>
                                    <span>{ingredient.quantity}</span>
                                    <span>{ingredient.unit}</span>
                                </div> 
                            }
                            {editing && <button onClick={(e) => removeIngredient(ingredient.id, e)}>Remove</button>}
                        </li>
                    )}
                </ol>
                {editing && <button onClick={(e) => addIngredient(e)}>+ Add</button>} 
                {editing && <button type="submit">Save</button>}
                {editing && <button onClick={(e) => deleteRecipe(id, e)}>Delete Recipe</button>}
            </form>
            {!editing && <button onClick={(e) => edit(e)}>Edit</button>}
        </div>
    );
}

export default Recipe;