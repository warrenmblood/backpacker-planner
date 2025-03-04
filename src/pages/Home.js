import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Trips from "../components/Trips";
import Tasks from "../components/Tasks";
import Itinerary from "../components/Itinerary";
import Food from "../components/Food";
import ShoppingList from "../components/ShoppingList";

function Home() {

    const [recipes, setRecipes] = useState([
        {
            id: "a123",
            name: "Clif Bar",
            serves: 1,
            ingredients: []
        },
        {
            id: "a124",
            name: "Mountain House",
            serves: 1,
            ingredients: []
        }
    ]);
    const [tripName, setTripName] = useState("Wonderland Trail");
    const [tripStartDate, setTripStartDate] = useState(new Date());
    const [tripDays, setTripDays] = useState([{id: `Day${Date.now()}`}]);

    const location = useLocation();

    return(
        <div className="Home">
            <Sidebar />
            <div className="main-content">
                {location.pathname === "/" && <Trips />}
                {location.pathname === "/tasks" && <Tasks />}
                {location.pathname === "/itinerary" && (
                    <Itinerary
                        recipes={recipes}
                        tripName={tripName}
                        tripStartDate={tripStartDate}
                        setTripStartDate={setTripStartDate}
                        tripDays={tripDays}
                        setTripDays={setTripDays}
                    />
                )}
                {location.pathname === "/recipes" && (
                    <Food
                        recipes={recipes}
                        setRecipes={setRecipes}
                    />
                )}
                {location.pathname === "/shopping-list" && <ShoppingList />}
            </div>
        </div>
    );
}

export default Home;