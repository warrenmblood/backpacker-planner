import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {

    const [active, setActive] = useState(false);

    const menuItems = ["Home", "Tasks", "Itinerary", "Meals", "Gear", "Shopping List"];

    const activateSidebar = () => setActive(!active);

    const navigate = useNavigate();

    const navSelect = (index) => {
        switch(index) {
            case 0:
                navigate("/");
                break;
            case 1:
                navigate("/tasks");
                break;
            case 2:
                navigate("/itinerary");
                break;
            case 3:
                navigate("/meals");
                break;
            case 4:
                navigate("/gear");
                break;
            case 5:
                navigate("/shopping-list");
        }
    };
    
    return (
        <div className={`sidebar${active ? " active" : ""}`}>
            <div className="header">
                <button onClick={activateSidebar}>&#9776;</button>
            </div>
            <ol className="menu-items">
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <button type="button" key={index} onClick={() => navSelect(index)}>{item}</button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default Sidebar;