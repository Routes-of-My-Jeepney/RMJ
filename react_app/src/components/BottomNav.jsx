import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsBus from "@mui/icons-material/DirectionsBus";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export const BottomNav = () => {
    const [value, setValue] = React.useState(0);

    return (
        <BottomNavigation
            showLabels
            sx={{ position: "fixed", bottom: 0, width: "100%" }}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        >
            <BottomNavigationAction label="Map" icon={<LocationOnIcon />} />
            <BottomNavigationAction label="Routes" icon={<DirectionsBus />} />
            <BottomNavigationAction label="How To" icon={<HelpOutlineIcon />} />
        </BottomNavigation>
    );
};
