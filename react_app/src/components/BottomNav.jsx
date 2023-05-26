import React from "react";
import { Link } from "react-router-dom";
import {
    BottomNavigation,
    BottomNavigationAction,
    linkClasses,
} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsBus from "@mui/icons-material/DirectionsBus";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export const BottomNav = () => {
    const [value, setValue] = React.useState(0);
    const routesLink = "/jeepneys";
    const mapLink = "/";
    const howToRideLink = "/how-to-ride";

    return (
        <BottomNavigation
            showLabels
            sx={{ position: "fixed", bottom: 0, width: "100%" }}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        >
            <BottomNavigationAction
                label="Map"
                icon={<LocationOnIcon />}
                component={Link}
                to={mapLink}
            />

            <BottomNavigationAction
                label="Routes"
                icon={<DirectionsBus />}
                component={Link}
                to={routesLink}
            />
            <BottomNavigationAction
                label="How To"
                icon={<HelpOutlineIcon />}
                component={Link}
                to={howToRideLink}
            />
        </BottomNavigation>
    );
};
