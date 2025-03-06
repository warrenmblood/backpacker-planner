import React from "react";

function ShoppingList({ tripName, groupSize, recipes, itinerary }) {

    console.log(itinerary);

    const shoppingList = [];
    const recipeCount = {};
    
    itinerary.forEach((day) => {
        day.food?.forEach((foodItem) => {
            if(!recipeCount[foodItem.recipe.id]) {
                recipeCount[foodItem.recipe.id] = 1;
            } else {
                recipeCount[foodItem.recipe.id] += 1;
            }
        })
    });

    recipes.forEach((recipe) => {
        const adjustment = groupSize / recipe.serves;
        recipe.ingredients?.forEach((ingredient) => {
            const item = {};
            item.name = ingredient.name;
            item.quantity = Math.ceil(ingredient.quantity * adjustment * (recipeCount[recipe.id] ? recipeCount[recipe.id] : 0));
            item.unit = ingredient.unit;
            shoppingList.push(item);
        })
    });
    
    return (
        <div className="ShoppingList">
            <h1>Shopping List</h1>
            <h2>{tripName}</h2>
            <ol>
                {shoppingList.map((item) =>
                    (item.quantity > 0) && <li>{`${item.quantity} ${item.unit} ${item.name}`}</li>
                )}
            </ol>
        </div>
    );
}

export default ShoppingList;