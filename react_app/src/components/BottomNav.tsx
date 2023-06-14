import React, { useCallback } from "react";
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
import { NavItem } from "../interfaces/NavItems";

export const BottomNav = () => {
    const [value, setValue] = React.useState<number>(0);

    const handleChange = useCallback(
        (event: React.ChangeEvent<{}>, newValue: number) => {
            setValue(newValue);
        },
        []
    );

    const navItems: NavItem[] = [
        { label: "Map", icon: <LocationOnIcon />, link: "/" },
        { label: "Routes", icon: <DirectionsBus />, link: "/jeepneys" },
        { label: "How To", icon: <HelpOutlineIcon />, link: "/how-to-ride" },
    ];

    return (
        <BottomNavigation
            showLabels
            sx={{
                position: "fixed",
                bottom: 0,
                width: "100%",
                display: { sm: "flex", md: "none" },
            }}
            value={value}
            onChange={handleChange}
        >
            {navItems.map((item, index) => (
                <BottomNavigationAction
                    key={index}
                    label={item.label}
                    icon={item.icon}
                    component={Link}
                    to={item.link}
                />
            ))}
        </BottomNavigation>
    );
};
