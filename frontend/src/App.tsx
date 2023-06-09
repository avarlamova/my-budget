import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import RequireAuth from "./components/RequireAuth";
import "./App.css";

import React from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import Register from "./components/Register";
// import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  return (
    <>
     <Routes>

       <Route path="/" element={<Layout />}>
         {/* public routes */}
         <Route index element={<Home />}></Route>
         <Route path="login" element={<Login />}></Route>
         <Route path="register" element={<Register />}></Route>

         {/* protected routes */}
         <Route element={<RequireAuth />}>
           <Route path="welcome" element={<Welcome />}></Route>
           <Route path="dashboard" element={<Dashboard />}></Route>
         </Route>
       </Route>
     </Routes>
    </>
  );
}

export default App;
