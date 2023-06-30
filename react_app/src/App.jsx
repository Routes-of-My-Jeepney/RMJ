import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HowToRide from "./pages/HowToRide";
import Login from "./pages/Login";
import Singup from "./pages/Signup";
import { BottomNav } from "./components/BottomNav";
import History from "./pages/history";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import PasswordReset from "./pages/PasswordReset";
import { LoadScript } from "@react-google-maps/api";
import ResponsiveDrawerWrapper from "./components/ResponsiveDrawerWrapper";
import { useVisualContext } from "./contexts/VisualContext";
import JeepneyRoutesPage from "./pages/JeepneyRoutesPage";
import CustomSnackbar from "./components/CustomSnackbar";
import { useSnackbarContext } from "./contexts/SnackbarContext";
import LoadingCircle from "./components/LoadingCircle";

function App() {
    const { isMobile } = useVisualContext();
    const { snackbars, closeSnackbar } = useSnackbarContext();

    return (
        <>
            <div className="App">
                <Navbar />
                {/* <LoadingCircle /> */}
                <div>
                    {snackbars.map((snackbar, i) => (
                        <CustomSnackbar
                            {...snackbar}
                            key={i}
                            style={{ top: `${i * 50}px` }}
                            handleClose={() => closeSnackbar(i)}
                        />
                    ))}
                </div>
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
                                element={<JeepneyRoutesPage />}
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
            </div>
        </>
    );
}

export default App;
