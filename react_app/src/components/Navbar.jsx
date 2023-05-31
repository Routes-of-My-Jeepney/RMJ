import React, { useState } from "react";
import {
    AppBar,
    Typography,
    Toolbar,
    Avatar,
    Menu,
    MenuItem,
    Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const pages = ["Home", "HowtoRide", "Routes"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const open = Boolean(anchorElUser);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // const handleMenu = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };
    return (
        <AppBar>
            <Toolbar>
                <Box
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="h6">RMJ</Typography>
                    <Avatar onClick={handleOpenUserMenu}></Avatar>
                    <Menu
                        anchorEl={anchorElUser}
                        id="account-menu"
                        open={open}
                        onClose={handleCloseUserMenu}
                        transformOrigin={{
                            horizontal: "right",
                            vertical: "top",
                        }}
                        anchorOrigin={{
                            horizontal: "right",
                            vertical: "bottom",
                        }}
                    >
                        <MenuItem
                            onClick={handleCloseUserMenu}
                            component={Link}
                            to="/login"
                        >
                            Login
                        </MenuItem>
                        <MenuItem
                            onClick={handleCloseUserMenu}
                            component={Link}
                            to="/signup"
                        >
                            Signup
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;
