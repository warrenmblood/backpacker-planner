import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Trips from "../components/Trips";
import Tasks from "../components/Tasks";
import Itinerary from "../components/Itinerary";
import Food from "../components/Food";
import ShoppingList from "../components/ShoppingList";

function Home() {

    const [tripName, setTripName] = useState("Wonderland Trail");
    const [startDate, setStartDate] = useState(new Date());
    const [groupSize, setGroupSize] = useState(1);
    const [recipes, setRecipes] = useState([]);
    const [itinerary, setItinerary] = useState([{id: `Day${Date.now()}`}]);

    const location = useLocation();

    return(
        <div className="Home">
            <Sidebar />
            <div className="main-content">
                {location.pathname === "/" && <Trips />}
                {location.pathname === "/tasks" && (
                    <Tasks
                        tripName={tripName}
                        startDate={startDate}
                        itinerary={itinerary}
                        setItinerary={setItinerary} 
                    />
                )}
                {location.pathname === "/itinerary" && (
                    <Itinerary
                        tripName={tripName}
                        setTripName={setTripName}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        groupSize={groupSize}
                        setGroupSize={setGroupSize}
                        recipes={recipes}
                        itinerary={itinerary}
                        setItinerary={setItinerary}
                    />
                )}
                {location.pathname === "/recipes" && (
                    <Food
                        recipes={recipes}
                        setRecipes={setRecipes}
                    />
                )}
                {location.pathname === "/shopping-list" && (
                    <ShoppingList
                        tripName={tripName}
                        groupSize={groupSize}
                        recipes={recipes}
                        itinerary={itinerary}
                    />
                )}
            </div>
        </div>
    );
}

export default Home;