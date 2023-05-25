import React from "react";
import Button from "@mui/material/Button";
import MapContainer from "../components/MapContainer";
import { Box, Container } from "@mui/material";
import JeepRoutes from "../components/Jeepneylist";

const jeepneys = () => {
    return (
        <Container maxWidth="xl">
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <JeepRoutes userId={null} />
            </Box>
        </Container>
    );
};

export default jeepneys;
