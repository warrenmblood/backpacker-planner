import React from "react";
import { Navigate, Outlet} from "react-router-dom";

function Protected() {
    
    const token = localStorage.getItem("token");

    return (
        token ? <Outlet /> : <Navigate to="/signin" />
    );
}

export default Protected;