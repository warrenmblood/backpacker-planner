import React from "react";

function Tasks({ tripName, startDate, itinerary, setItinerary }) {

    console.log(itinerary);

    const dateFormat = { year: "numeric", month: "numeric", day: "numeric" };
    const taskList = [];

    itinerary.forEach((day, index) => {
        if(day.lodging?.status === "Need to reserve") {
            const date = new Date(startDate);
            date.setDate(date.getDate() + index);
            taskList.push(`Reserve ${day.lodging.location} for ${date.toLocaleDateString("en-US", dateFormat)}`);
        }
        if(day.transportation?.status === "Need to reserve") {
            const date = new Date(startDate);
            date.setDate(date.getDate() + index);
            taskList.push(`Reserve ${day.transportation.transportName} for ${date.toLocaleDateString("en-US", dateFormat)}`);
        }
    });
    
    return (
        <div className="Tasks">
            <h1>Tasks</h1>
            <h2>{tripName}</h2>
            <ol>
                {taskList.map((task) => 
                    <li>{task}</li>
                )}
            </ol>
        </div>
    );
}

export default Tasks;