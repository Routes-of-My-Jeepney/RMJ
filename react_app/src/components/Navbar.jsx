import React, { useContext, useEffect, useState } from "react";
import {
    AppBar,
    Typography,
    Toolbar,
    Avatar,
    Menu,
    MenuItem,
    Box,
    IconButton,
} from "@mui/material";

import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const pages = ["Home", "HowtoRide", "Routes"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const open = Boolean(anchorElUser);
    const { deleteUser, logout, user } = useContext(UserContext);
    const [profileImgURL, setProfileImgURL] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    useEffect(() => {
        if (user) {
            setProfileImgURL(
                `http://localhost:8000/storage/images/${user.profile_img}`
            );
        }
    }, [user]);

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
                    {user && (
                        <Avatar
                            src={profileImgURL}
                            onClick={handleOpenUserMenu}
                        ></Avatar>
                    )}
                    {!user && <Avatar onClick={handleOpenUserMenu}></Avatar>}
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
                                    handleCloseUserMenu();
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

                        {user && (
                            <MenuItem
                                key="password-reset"
                                onClick={handleCloseUserMenu}
                                component={Link}
                                to="/password-reset"
                            >
                                パスワード再設定
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
