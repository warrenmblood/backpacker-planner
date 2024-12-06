import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import Sidebar from "../components/Sidebar";
import Trips from "../components/Trips";
import Tasks from "../components/Tasks";
import Itinerary from "../components/Itinerary";
import Meals from "../components/Meals";
import Gear from "../components/Gear";
import ShoppingList from "../components/ShoppingList";

function Home() {
    
    const [trip, setTrip] = useState({});
    const [savedTrips, setSavedTrips] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();
    
    const handleSubmit = async() => {
        try {
            await signOut(auth);
            localStorage.removeItem('token');
            localStorage.removeItem('user');  
            navigate("/login");
        } catch(error) {
            console.error(error);
        }
    };

    return(
        <div className="Home">
            <Sidebar />
            <div className="main-content">Home
                <button onClick={handleSubmit}>Log out</button>
                {location.pathname === "/" && <Trips />}
                {location.pathname === "/tasks" && <Tasks />}
                {location.pathname === "/itinerary" && <Itinerary />}
                {location.pathname === "/meals" && <Meals />}
                {location.pathname === "/gear" && <Gear />}
                {location.pathname === "/shopping-list" && <ShoppingList />}
            </div>
        </div>
    );
}

export default Home;