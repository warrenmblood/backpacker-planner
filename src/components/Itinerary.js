import React, { useState } from "react";
import Day from "./Day";
import { convertUTCToLocal } from "../utils.js";

function Itinerary({ recipes, tripName, tripStartDate, setTripStartDate, tripDays, setTripDays }) {
    const [numPeople, setNumPeople] = useState(1);
    const [updating, setUpdating] = useState(false);
    const [tempDate, setTempDate] = useState(tripStartDate);
    const [updateBtnText, setUpdateBtnText] = useState("Cancel");

    const handleUpdating = () => {
        setUpdating(true);
    };

    const changeTempDate = (date) => {
        setUpdateBtnText("Update Start Date");
        setTempDate(date);
    };

    const submitStartDate = () => {
        setTripStartDate(tempDate);
        setUpdateBtnText("Cancel");
        setUpdating(false);
    };

    const addDay = () => {
        const day = {};
        day.id = `Day${Date.now()}`;
        const tripDaysCopy = [...tripDays];
        tripDaysCopy.push(day);
        setTripDays(tripDaysCopy);
    };

    const removeDay = (id, event) => {
        const tripDaysCopy = tripDays.filter((day) => day.id !== id);
        setTripDays(tripDaysCopy);
    };

    const updateDay = (id, description, start, end, food, lodging, transportation) => {
        const tripDaysCopy = [...tripDays];
        const thisDay = tripDaysCopy.find((day) => day.id === id);
        thisDay.description = description;
        thisDay.start = start;
        thisDay.end = end;
        thisDay.food = food;
        thisDay.lodging = lodging;
        thisDay.transportation = transportation;
        setTripDays(tripDaysCopy);
        console.log(tripDaysCopy);
    }

    return (
        <div className="Itinerary">
            <h1>{tripName ?? "Select a Trip to Build Itinerary"}</h1>
            <div>
                <label htmlFor="numPeople">Group Size</label>
                <input
                    id="numPeople"
                    type="number"
                    defaultValue={numPeople}
                    onChange={(n) => setNumPeople(n)}
                />
            </div>
            <div>   
                {updating ?
                    <div>
                        <input 
                            type="date"
                            required="required"
                            onChange={(e) => changeTempDate(convertUTCToLocal(new Date(e.target.value)))}
                        />
                        <button onClick={submitStartDate}>{updateBtnText}</button>
                    </div>
                    :
                    <button onClick={handleUpdating}>Change Start Date</button>
                }
            </div>
            <ol>
                {tripDays.map((day, index) => 
                    <li>
                        <Day 
                            id={day.id}
                            index={index}
                            tripStartDate={tripStartDate}
                            recipes={recipes}
                            removeDay={removeDay}
                            updateDay={updateDay}
                        />
                    </li>
                    )
                }
            </ol>
            <button className="addDay" onClick={addDay}>+Add Day</button>
        </div>
    );
}

export default Itinerary;