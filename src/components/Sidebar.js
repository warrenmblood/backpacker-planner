import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function Sidebar() {

    const [active, setActive] = useState(false);

    const menuItems = ["Home", "Tasks", "Itinerary", "Food", "Shopping List", "Sign Out"];

    const activateSidebar = () => setActive(!active);

    const navigate = useNavigate();

    const handleSignOut = async() => {
        try {
            await signOut(auth);
            localStorage.removeItem('token');
            localStorage.removeItem('user');  
            navigate("/signin");
        } catch(error) {
            console.error(error);
        }
    };

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
                navigate("/food");
                break;
            case 4:
                navigate("/shopping-list");
                break;
            case 5:
                handleSignOut();
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