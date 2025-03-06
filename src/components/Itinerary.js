import React, { useState } from "react";
import Day from "./Day";
import { convertUTCToLocal } from "../utils.js";

function Itinerary({ tripName, setTripName, startDate, setStartDate, groupSize, setGroupSize, recipes, itinerary, setItinerary }) {
    
    const [editing, setEditing] = useState(false); // whether header info is being edited
    const [start, setStart] = useState(startDate);
    const [name, setName] = useState(tripName);
    const [size, setSize] = useState(groupSize);

    const dateFormat = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

    const submitHeader = () => {
        setTripName(name);
        setStartDate(start);
        setGroupSize(size);
        setEditing(false);
    };

    const addDay = () => {
        const day = {};
        day.id = `Day${Date.now()}`;
        const itineraryCopy = [...itinerary];
        itineraryCopy.push(day);
        setItinerary(itineraryCopy);
    };

    const removeDay = (id) => {
        const itineraryCopy = itinerary.filter((day) => day.id !== id);
        setItinerary(itineraryCopy);
    };

    return (
        <div className="Itinerary">
            <h1>Itinerary</h1>
            <div className="header">
                {editing ?
                    <div>
                        <input
                            id="tripName"
                            type="text"
                            required="required"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="startDate">Start Date</label>
                        <input
                            id="startDate"
                            type="date"
                            required="required"
                            onChange={(e) => setStart(convertUTCToLocal(new Date(e.target.value)))}
                        />
                        <label htmlFor="size">Group Size</label>
                        <input
                            id="groupSize"
                            type="number"
                            defaultValue={groupSize}
                            onChange={(e) => setSize(e.target.value)}
                        />
                        <button onClick={() => setEditing(false)}>Cancel</button>
                        <button onClick={submitHeader}>Update</button>
                    </div>
                    :
                    <div>
                        <h2>{tripName ?? "Select a Trip to Build Itinerary"}</h2>
                        <h3>{startDate.toLocaleDateString("en-US", dateFormat)}</h3>
                        <p>{`Group Size: ${groupSize}`}</p>
                        <button onClick={() => setEditing(true)}>Edit Header</button>
                    </div>
                }
            </div>
            <ol>
                {itinerary.map((day, index) => 
                    <li>
                        <Day
                            index={index}
                            id={day.id}
                            startDate={startDate}
                            recipes={recipes}
                            itinerary={itinerary}
                            setItinerary={setItinerary}
                            removeDay={removeDay}
                            dateFormat={dateFormat}
                        />
                    </li>
                    )
                }
            </ol>
            <button className="addDay" onClick={addDay}>Add Day</button>
        </div>
    );
}

export default Itinerary;