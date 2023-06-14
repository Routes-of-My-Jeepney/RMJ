import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import HowToRide from "./pages/HowToRide";
import Login from "./pages/Login";
import Singup from "./pages/Signup";
import { BottomNav } from "./components/BottomNav";
import JeepRoutes from "./components/Jeepneylist";
import History from "./pages/history";
import UserProvider from "./contexts/UserProvider";
import { useMediaQuery, ThemeProvider, createTheme, Box } from "@mui/material";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import { useState } from "react";
import PasswordReset from "./pages/PasswordReset";
import { LoadScript } from "@react-google-maps/api";
import ResponsiveDrawerWrapper from "./components/ResponsiveDrawerWrapper";
import { theme } from "./utils/theme";

function App() {
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [drawerOpen, setDrawerOpen] = useState(false);
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <UserProvider>
                    <Navbar />
                    <ResponsiveDrawerWrapper>
                        <LoadScript
                            googleMapsApiKey={
                                import.meta.env.VITE_GOOGLE_MAPS_API_KEY
                            }
                            libraries={["places"]}
                        >
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route
                                    path="/jeepneys/*"
                                    element={<JeepRoutes />}
                                />
                                <Route
                                    path="/how-to-ride"
                                    element={<HowToRide />}
                                />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Singup />} />
                                <Route path="/history" element={<History />} />
                                <Route
                                    path="/update"
                                    element={<UpdateProfilePage />}
                                />
                                <Route
                                    path="/password-reset"
                                    element={<PasswordReset />}
                                />
                            </Routes>
                        </LoadScript>
                    </ResponsiveDrawerWrapper>
                    {isMobile && <BottomNav />}
                </UserProvider>
            </div>
        </ThemeProvider>
    );
}

export default App;
