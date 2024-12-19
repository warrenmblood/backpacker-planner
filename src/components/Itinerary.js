import React from "react";
import Day from "./Day";

function Itinerary({ trip, meals }) {
    const hasDays = trip.days ? trip.days.length > 0 : 0;

    return (
        <div className="Itinerary">
            <h1>{trip.name ?? "Select a Trip to Build Itinerary"}</h1>
            <ol>
                {hasDays ? 
                    trip.days.map(day => 
                        <li>
                            <Day meals={meals}/>
                        </li>
                    ) :
                    <li>
                        <Day meals={meals}/>
                    </li>
                }
            </ol>
        </div>
    );
}

export default Itinerary;