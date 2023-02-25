import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { auth } = useSelector((state) => state);

  // const token = localStorage.getItem("firstLogin");
  if (!auth.token) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
