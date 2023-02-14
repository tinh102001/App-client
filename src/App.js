import React from "react";
import { Routes, Route} from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Status from "./components/home/Status";

function App() {
  return (
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/" element={<Status></Status>}></Route>
      </Routes>
  );
}

export default App;
