import React from "react";
import MapContainer from "./components/MapContainer";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Jeepney_Routes from "./pages/Jeepney_RoutesPage";
import HowToRide from "./pages/HowToRide";
import Login from "./pages/Login";
import Singup from "./pages/Signup";
import { BottomNav } from "./components/BottomNav";
import JeepRoutes from "./components/Jeepneylist";

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jeepneys/*" element={<JeepRoutes />} />
                <Route path="/how-to-ride" element={<HowToRide />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Singup />} />
            </Routes>
            <BottomNav />
        </div>
    );
}

export default App;