import React, { useState } from "react";
import { useMediaQuery, Box } from "@mui/material";
import ResponsiveDrawer from "./ResponsiveDrawer";
import SidebarToggleButton from "./SidebarToggleButton";
import theme from "../utils/theme";

const ResponsiveDrawerWrapper = ({ children }) => {
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [drawerOpen, setDrawerOpen] = useState(false);
    return (
        <Box sx={{ display: isMobile ? "block" : "flex" }}>
            <Box
                sx={{
                    width: isMobile ? "0" : drawerOpen ? "25vw" : "0",
                }}
            >
                {!isMobile && drawerOpen && (
                    <ResponsiveDrawer open={drawerOpen} />
                )}
            </Box>
            {!isMobile && (
                <SidebarToggleButton
                    isOpen={drawerOpen}
                    toggleDrawer={() => setDrawerOpen(!drawerOpen)}
                />
            )}
            <Box
                sx={{
                    width: isMobile ? "100vw" : drawerOpen ? "75vw" : "100vw",
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default ResponsiveDrawerWrapper;
