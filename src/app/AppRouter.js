import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./auth/Auth";
import RedirectLogin from "./pages/RedirectLogin";
// import Status from "../components/home/Status";

function AppRouter() {
  return (
    <Routes>
      <Route path="/auth/*" element={<Auth />}></Route>
      <Route path="*" element={<RedirectLogin />} />
    </Routes>
  );
}

export default AppRouter;
