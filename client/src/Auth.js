import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

// auth middleware
const Authentication = () => {
    // check cookies
    const token = cookies.get("TOKEN");
  
    return token ? <Outlet /> : <Navigate to="/login"/>;
}

export default Authentication;