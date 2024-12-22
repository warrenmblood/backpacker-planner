import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, ButtonGroup } from "@mui/material";

function Day({ meals }) {
    // state variables
    const [food, setFood] = useState([{
        id: "z123",
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

    const getMealName = (mealStr) => {
        if(!mealStr) {
            return "";
        }
        return JSON.parse(mealStr).name;
    };

    return (
        <div className="Day">
            <h2>Day</h2>
            <h3>January 14, 2025</h3>
            <form onSubmit={handleSubmit(save)} className="day-form">
                <fieldset className="day-header">
                    <div>
                        {editing ? 
                            <input 
                                {...register("description")}
                                type="textarea" 
                            /> : 
                            <p>{getValues("description")}</p>
                        }
                    </div>
                    <div>
                        <label>Start Location</label>
                        {editing ?
                            <input
                                {...register("start")} 
                                type="text" 
                            /> :
                            <span>{getValues("start")}</span>
                        }
                    </div>
                    <div>
                        <label>End Location</label>
                        {editing ?
                            <input
                                {...register("end")}
                                type="text"
                            /> :
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
                                        <select {...register(foodItem.id + "/meal")}>
                                            {meals.map(((meal) => 
                                                <option value={JSON.stringify(meal)}>{meal.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    :
                                    <div>
                                        <label>{getValues(foodItem.id + "/name")}</label>
                                        <span>{getMealName(getValues(foodItem.id + "/meal"))}</span>
                                    </div>   
                                }
                            </li>
                        )}
                    </ol>                
                    <button>+ Add Food</button>
                </fieldset>
                <fieldset className="lodging-and-transportation">
                    <legend>Lodging & Transportation</legend>
                    <div>
                        <label>Lodging (Campsite)</label>
                        {editing ?
                            <input
                                {...register("lodging")}
                                type="text"
                            /> :
                            <span>{getValues("lodging")}</span>
                        }
                        <ButtonGroup variant="outlined" size="small" aria-label="Basic button group">
                            <Button>Need to Reserve</Button>
                            <Button>Reserved</Button>
                            <Button>N/A</Button>
                        </ButtonGroup>
                    </div>
                    <div>
                        <label>Transportation</label>
                        {editing ?
                            <input
                                {...register("transportation")}
                                type="text"
                            /> :
                            <span>{getValues("transportation")}</span>
                        }
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