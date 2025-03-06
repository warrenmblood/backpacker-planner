import React, { useState } from "react";
import { useForm } from "react-hook-form";

function Day({ index, id, startDate, recipes, itinerary, setItinerary, removeDay, dateFormat }) {

    const [editing, setEditing] = useState(false);
    const [food, setFood] = useState([]);

    const today = new Date(startDate);
    today.setDate(today.getDate() + index);

    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const updateDay = (description, start, end, food, lodging, transportation) => {
        const itineraryCopy = [...itinerary];
        const thisDay = itineraryCopy.find((day) => day.id === id);
        thisDay.description = description;
        thisDay.start = start;
        thisDay.end = end;
        thisDay.food = food;
        thisDay.lodging = lodging;
        thisDay.transportation = transportation;
        setItinerary(itineraryCopy);
    }

    const save = (data) => {
        const lodging = {
            location: data.lodgingText,
            status: data.lodgingStatus
        };
        const transportation = {
            transportName: data.transportationText,
            status: data.transportationStatus
        };
        const foodCopy = [...food];
        foodCopy.forEach((item) => {
            item.name = data[item.id + "/name"];
            item.recipe = JSON.parse(data[item.id + "/recipe"]);
        });
        setFood(foodCopy);
        updateDay(data.description, data.start, data.end, foodCopy, lodging, transportation);
        setEditing(false);
    };

    const getRecipeName = (recipeStr) => {
        if(!recipeStr) {
            return "";
        }
        return JSON.parse(recipeStr).name;
    };
    
    const createFoodItem = () => {
        const item = {};
        item.id = `foodItem${Date.now()}`;
        item.name = "";
        return item;
    };

    const addFood = (event) => {
        event.preventDefault();  // stop the form from submitting
        const foodCopy = [...food];
        foodCopy.push(createFoodItem());
        setFood(foodCopy);
    };

    const removeFood = (id, event) => {
        event.preventDefault();  // stop the form from submitting
        const foodCopy = food.filter((item) => item.id !== id);
        setFood(foodCopy);
    };

    return (
        <div className="Day">
            <h2>{`Day ${index}`}</h2>
            <h3>{today.toLocaleDateString("en-US", dateFormat)}</h3>
            <form onSubmit={handleSubmit(save)} className="day-form">
                <fieldset className="day-header">
                    <div>
                        {editing ? 
                            <input 
                                {...register("description")}
                                type="textarea"
                                placeholder="Description"
                                autoFocus
                            /> 
                            : 
                            <p>{getValues("description")}</p>
                        }
                    </div>
                    <div>
                        <label>Start Location</label>
                        {editing ?
                            <input
                                {...register("start")} 
                                type="text" 
                            /> 
                            :
                            <span>{getValues("start")}</span>
                        }
                    </div>
                    <div>
                        <label>End Location</label>
                        {editing ?
                            <input
                                {...register("end")}
                                type="text"
                            /> 
                            :
                            <span>{getValues("end")}</span>
                        }
                    </div>
                </fieldset>
                <fieldset className="food">
                    <legend>Food</legend>
                    <ol>
                        {food.map((foodItem) =>
                            <li>
                                {editing ?
                                    <div>
                                        <input
                                            {...register(foodItem.id + "/name")}
                                            type="text"
                                            defaultValue={foodItem.name}
                                        />
                                        <select {...register(foodItem.id + "/recipe")}>
                                            {recipes.map(((recipe) => 
                                                <option value={JSON.stringify(recipe)}>{recipe.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    :
                                    <div>
                                        <label>{getValues(foodItem.id + "/name")}</label>
                                        <span>{getRecipeName(getValues(foodItem.id + "/recipe"))}</span>
                                    </div>  
                                }
                                {editing && <button onClick={(e) => removeFood(foodItem.id, e)}>Remove</button>}
                            </li>
                        )}
                    </ol>
                    {editing && <button onClick={(e) => addFood(e)}>+ Add Food</button>}       
                </fieldset>
                <fieldset className="lodging-and-transportation">
                    <legend>Lodging & Transportation</legend>
                    <div>
                        <label>Lodging (Campsite)</label>
                        {editing ?
                            <div>
                                <input
                                    {...register("lodgingText")}
                                    type="text"
                                /> 
                                <div>
                                    <input
                                        {...register("lodgingStatus")}
                                        type="radio"
                                        value="Need to reserve"
                                    />Need to Reserve
                                    <input
                                        {...register("lodgingStatus")}
                                        type="radio"
                                        value="Reserved"
                                    />Reserved
                                    <input
                                        {...register("lodgingStatus")}
                                        type="radio"
                                        value="No reservation needed"
                                    />No Reservation Needed
                                </div>
                            </div>
                            :
                            <div>
                                <span>{getValues("lodgingText") ?? ""}</span>
                                <span>
                                    {getValues("lodgingStatus") ? 
                                        ` (${getValues("lodgingStatus")})`
                                        :
                                        ``
                                    }
                                </span>
                            </div>
                        }
                    </div>
                    <div>
                        <label>Transportation</label>
                        {editing ?
                            <div>
                                <input
                                    {...register("transportationText")}
                                    type="text"
                                />
                                <div>
                                    <input
                                        {...register("transportationStatus")}
                                        type="radio"
                                        value="Need to reserve"
                                    />Need to Reserve
                                    <input
                                        {...register("transportationStatus")}
                                        type="radio"
                                        value="Reserved"
                                    />Reserved
                                    <input
                                        {...register("transportationStatus")}
                                        type="radio"
                                        value="No reservation needed"
                                    />No Reservation Needed
                                </div>
                            </div>
                            :
                            <div>
                                <span>{getValues("transportationText") ?? ""}</span>
                                <span>
                                    {getValues("transportationStatus") ? 
                                        ` (${getValues("transportationStatus")})`
                                        :
                                        ``
                                    }
                                </span>
                            </div>
                        }
                    </div>
                    {editing && <button type="submit">Save</button>}
                    {editing && <button onClick={() => removeDay(id)}>Remove Day</button>}
                </fieldset>
            </form>
            {!editing && <button onClick={() => setEditing(true)}>Edit</button>}
        </div>
    );
}

export default Day;