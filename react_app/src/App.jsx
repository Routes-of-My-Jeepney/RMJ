import React from "react";
import MapContainer from "./components/MapContainer";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Home from "./pages/Home";
import Jeepney_Routes from "./pages/Jeepney_Routes";
import HowToRide from "./pages/HowToRide";
import Login from "./pages/Login";
import Singup from "./pages/Signup";
import ResponsiveAppBar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
          <Routes>
              <Route path="/" element={ <Home /> } />
              <Route path="/routes" element={ <Jeepney_Routes /> } />
              <Route path="/how-to-ride" element={ <HowToRide /> } />
              <Route path="/login" element={ <Login /> } />
              <Route path="/signup" element={ <Singup /> } />
          </Routes>
      <MapContainer />
    </div>
  );
}

export default App;