import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import HomePage from "../pages/HomePage";
// import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

// import Alert from "../components/alert/Alert";
// import Loading from "../components/alert/Loading";
import { refreshToken } from "../redux/actions/authActions";
import PrivateRoute from "./PrivateRoute";
function AppRouter() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  // const firstLogin = localStorage.getItem("firstLogin");

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  console.log(auth);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default AppRouter;
