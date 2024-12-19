import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, ButtonGroup } from "@mui/material";

function Day({ meals }) {
    // state variables
    const [food, setFood] = useState([{
        name: "Snack 1",
        mealID: "a123"
    }]);

    const [editing, setEditing] = useState(false);
    
    //
    const { 
        register,
        getValues,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const edit = () => {
        console.log('editing');
        setEditing(true);
    };

    const save = (data, event) => {
        event.preventDefault(); // stop the form from submitting
        console.log('saving');
        setEditing(false);
    };

    return (
        <div className="Day">
            <h2>Day</h2>
            <h3>January 14, 2025</h3>
            <form onSubmit={handleSubmit(save)} className="day-form">
                <fieldset className="day-header">
                    <div>
                        <label htmlFor="description" />
                        {editing ? 
                            <input 
                                {...register("description")}
                                id="description" 
                                type="textarea" 
                            /> : 
                            <p id="description">{getValues("description")}</p>
                        }
                    </div>
                    <div>
                        <label htmlFor="start">Start Location</label>
                        <input id="start" type="text" />
                    </div>
                    <div>
                        <label htmlFor="end">End Location</label>
                        <input id="end" type="text" />
                    </div>
                </fieldset>
                <fieldset className="food">
                    <legend>Food</legend>
                    <ol>
                        {food.map((foodItem) =>
                            <li>
                                <label htmlFor="foodItem">{foodItem.name}</label>
                                <select id="foodItem">
                                    {meals.map(((meal) => 
                                        <option value={meal.id}>{meal.name}</option>
                                    ))}
                                </select>
                            </li>
                        )}
                    </ol>                
                    <button>+ Add Food</button>
                </fieldset>
                <fieldset className="sleep-and-transportation">
                    <legend>Sleep & Transportation</legend>
                    <div>
                        <label htmlFor="campsite">Campsite/Lodging</label>
                        <input id="campsite" type="text" />
                        <ButtonGroup variant="outlined" size="small" aria-label="Basic button group">
                            <Button>Need to Reserve</Button>
                            <Button>Reserved</Button>
                            <Button>N/A</Button>
                        </ButtonGroup>
                    </div>
                    <div>
                        <label htmlFor="transportation">Transportation</label>
                        <input id="transportation" type="text" />
                        <ButtonGroup variant="outlined" size="small" aria-label="Basic button group">
                            <Button>Need to Reserve</Button>
                            <Button>Reserved</Button>
                            <Button>N/A</Button>
                        </ButtonGroup>
                    </div>
                    <button type="submit">Save</button>
                </fieldset>
            </form>
            <button onClick={edit}>Edit</button>
        </div>
    );
}

export default Day;