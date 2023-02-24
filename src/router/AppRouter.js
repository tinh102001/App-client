import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import { refreshToken } from "../redux/actions/authActions";

function AppRouter() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  // const firstLogin = localStorage.getItem("firstLogin");

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={auth.token ? <HomePage /> : <Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
