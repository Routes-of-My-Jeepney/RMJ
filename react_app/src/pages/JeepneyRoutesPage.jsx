import React from "react";
import Button from "@mui/material/Button";
import MapContainer from "../components/MapContainer";
import { Box, Container } from "@mui/material";
import JeepRoutes from "../components/JeepneyRoutes";
import { JeepneyProvider } from "../contexts/JeepneyContext";
import JeepneyRoutes from "../components/JeepneyRoutes";
import JeepneyList from "../components/JeepneyList";
import JeepneyMap from "../components/JeepneyMap";

const JeepneyRoutesPage = () => {
    return (
        <JeepneyProvider>
            <JeepneyRoutes>
                <JeepneyList />
                <JeepneyMap />
            </JeepneyRoutes>
        </JeepneyProvider>
    );
};

export default JeepneyRoutesPage;
