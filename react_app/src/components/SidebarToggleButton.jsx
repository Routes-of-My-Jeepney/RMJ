import React from "react";
import { Box, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

function SidebarToggleButton({ isOpen, toggleDrawer }) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "40px", // You can adjust this
                height: "100%", // You can adjust this
                position: "fixed",
                left: isOpen ? "25vw" : "0",
                zIndex: 1252,
            }}
        >
            <IconButton onClick={toggleDrawer}>
                {isOpen ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
        </Box>
    );
}

export default SidebarToggleButton;
