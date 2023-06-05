import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import HowToRide from "./pages/HowToRide";
import Login from "./pages/Login";
import Singup from "./pages/Signup";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import { BottomNav } from "./components/BottomNav";
import JeepRoutes from "./components/Jeepneylist";
import History from "./pages/history";
import axios from "axios";
import UserProvider from "./contexts/UserProvider";
import { useMediaQuery, ThemeProvider, createTheme, Box } from "@mui/material";
import UpdateProfilePage from "./pages/UpdateProfilePage";

axios.defaults.withCredentials = true;
const theme = createTheme({
    zIndex: {
        appBar: 1251,
        drawer: 1250
    }
}
);
function App() {
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (

        <ThemeProvider theme={theme}>
            <div className="App">
                <UserProvider>
                    <Navbar />
                    <Box sx={{ display: isMobile ? "block" : "flex" }}>
                        <Box sx={{ width: isMobile ? "0" : "25vw"}}>
                            {!isMobile && <ResponsiveDrawer />}
                        </Box>
                        <Box sx={{ width: isMobile ? "100vw" : "75vw"}}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/jeepneys/*" element={<JeepRoutes />} />
                                <Route path="/how-to-ride" element={<HowToRide />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Singup />} />
                                <Route path="/history" element={<History />} />
                            </Routes>
                        </Box>
                    </Box>
                    {isMobile && <BottomNav />}
                </UserProvider>
            </div>
        </ThemeProvider >
        <div className="App">
            <UserProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/jeepneys/*" element={<JeepRoutes />} />
                    <Route path="/how-to-ride" element={<HowToRide />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Singup />} />
                    <Route path="/history" element={<History />}/>
                    <Route path="/update" element={<UpdateProfilePage />} />                   
                </Routes>
                <BottomNav />
            </UserProvider>
        </div>
    );
}

export default App;
