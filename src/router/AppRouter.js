import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const HomePage = lazy(() => import("../pages/HomePage"));
const Register = lazy(() => import("../pages/Auth/Register"));
const Login = lazy(() => import("../pages/Auth/Login"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));
function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
