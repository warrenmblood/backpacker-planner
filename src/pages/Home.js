import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function Home() {

    const navigate = useNavigate();
    
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
        <div className="Home">Home
           <button onClick={handleSubmit}>Log out</button>
        </div>
    );
}

export default Home;