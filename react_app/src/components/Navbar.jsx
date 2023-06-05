import React, { useContext, useState } from "react";
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
import UserContext from "../contexts/UserContext";

const pages = ["Home", "HowtoRide", "Routes"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const open = Boolean(anchorElUser);
    const { deleteUser, logout } = useContext(UserContext);
    let user = JSON.parse(localStorage.getItem("user"));

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
                    {user && <Typography variant="h6">{user.id}</Typography>}
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
                        {user && (
                            <MenuItem
                                key="update"
                                onClick={handleCloseUserMenu}
                                component={Link}
                                to="/update"
                            >
                                プロフィールの編集
                            </MenuItem>
                        )}
                        {user && (
                            <MenuItem
                                key="history"
                                onClick={handleCloseUserMenu}
                                component={Link}
                                to="/history"
                            >
                                履歴
                            </MenuItem>
                        )}
                        {user ? (
                            <MenuItem
                                key="logout"
                                onClick={() => {
                                    logout();
                                }}
                            >
                                ログアウト
                            </MenuItem>
                        ) : (
                            <MenuItem
                                key="login"
                                onClick={handleCloseUserMenu}
                                component={Link}
                                to="/login"
                            >
                                ログイン
                            </MenuItem>
                        )}

                        {user ? (
                            <MenuItem
                                key="delete"
                                onClick={() => {
                                    deleteUser(user.id);
                                }}
                            >
                                アカウント削除
                            </MenuItem>
                        ) : (
                            <MenuItem
                                key="signup"
                                onClick={handleCloseUserMenu}
                                component={Link}
                                to="/signup"
                            >
                                サインアップ
                            </MenuItem>
                        )}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;
