import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Trips from "../components/Trips";
import Tasks from "../components/Tasks";
import Itinerary from "../components/Itinerary";
import Food from "../components/Food";
import Gear from "../components/Gear";
import ShoppingList from "../components/ShoppingList";

function Home() {
    
    const [trip, setTrip] = useState({});
    const [savedTrips, setSavedTrips] = useState([]);

    const location = useLocation();

    const meals = [];
    meals.push({
        id: "a123",
        name: "Clif Bar"
    });
    meals.push({
        id: "a124",
        name: "Mountain House"
    });

    return(
        <div className="Home">
            <Sidebar />
            <div className="main-content">
                {location.pathname === "/" && <Trips />}
                {location.pathname === "/tasks" && <Tasks />}
                {location.pathname === "/itinerary" && (
                    <Itinerary
                        trip={trip}
                        meals={meals}
                    />
                )}
                {location.pathname === "/food" && <Food />}
                {location.pathname === "/gear" && <Gear />}
                {location.pathname === "/shopping-list" && <ShoppingList />}
            </div>
        </div>
    );
}

export default Home;