import React, { useState, useEffect, useContext } from "react";
import axios from "../axios";
import LikeButton from "./LikeButton";
import MapJeepRoutes from "./MapJeepRoutes";
import UserContext from "../contexts/UserContext";
import getCSRFToken from "../utils/getCSRFToken";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Switch, useTheme, useMediaQuery } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import {
    Grid,
    Box,
    Button,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    ListSubheader,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import InboxIcon from "@mui/icons-material/Inbox";
import EditIconField from "./EditIconField";

function JeepRoutes() {
    const [jeepneys, setJeepneys] = useState([]);
    const [selectedJeepney, setSelectedJeepney] = useState(null);
    const [open, setOpen] = useState(false);
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleClick = () => {
        setOpen(!open);
    };

    const handleJeepneyClick = (selectedJeepney) => {
        setSelectedJeepney(selectedJeepney);
    };
    const toggleFavorites = () => {
        setShowOnlyFavorites(!showOnlyFavorites);
    };

    const toggleDrawer = (open) => (event) => {
        setDrawerOpen(open);
    };

    const jeepneyList = () => {
        return (
            <List
                sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Nested List Items
                    </ListSubheader>
                }
            >
                <FormControlLabel
                    sx={{ color: "text.primary" }}
                    control={
                        <Switch
                            checked={showOnlyFavorites}
                            onChange={toggleFavorites}
                        />
                    }
                    label="Show favorites"
                />
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit></Collapse>

                {jeepneys
                    .filter((jeepney) => !showOnlyFavorites || jeepney.isLiked)
                    .map((jeepney) => (
                        <List
                            component="div"
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                            disablePadding
                        >
                            <ListItemButton
                                variant="contained"
                                key={jeepney.id}
                                onClick={() => handleJeepneyClick(jeepney)}
                            >
                                {showOnlyFavorites &&
                                jeepney.liked_by_users.length > 0 &&
                                jeepney.liked_by_users[0].pivot &&
                                jeepney.liked_by_users[0].pivot.custom_name
                                    ? jeepney.liked_by_users[0].pivot
                                          .custom_name
                                    : jeepney.name}
                            </ListItemButton>
                            <LikeButton
                                jeepney={jeepney}
                                // userId={user.id}
                                // initialIsFavorite={
                                //     jeepney.isFavorite
                                // }
                                jeepneys={jeepneys}
                                setJeepneys={setJeepneys}
                            />
                            {showOnlyFavorites && (
                                <EditIconField
                                    initialText={
                                        jeepney.liked_by_users.length > 0 &&
                                        jeepney.liked_by_users[0].pivot &&
                                        jeepney.liked_by_users[0].pivot
                                            .custom_name
                                            ? jeepney.liked_by_users[0].pivot
                                                  .custom_name
                                            : jeepney.name
                                    }
                                    jeepney={jeepney}
                                    setJeepneys={setJeepneys}
                                />
                            )}
                        </List>
                    ))}
            </List>
        );
    };

    useEffect(
        () => async () => {
            await getCSRFToken();
            axios
                .get(`/api/jeepneys`)
                .then((response) => {
                    setJeepneys(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        []
    );

    return (
        <>
            {isMobile ? (
                <Grid container style={{ height: "calc(100vh - 70px)" }}>
                    <Grid item xs={12}>
                        {isMobile && (
                            <Box>
                                <Button onClick={toggleDrawer(true)}>
                                    jeepneys
                                </Button>
                                <SwipeableDrawer
                                    anchor="left"
                                    open={drawerOpen}
                                    onClose={(event) => {
                                        event.stopPropagation();
                                        toggleDrawer(false)(event);
                                    }}
                                    onOpen={toggleDrawer(true)}
                                >
                                    {jeepneyList()}
                                </SwipeableDrawer>
                            </Box>
                        )}
                        <Box position="relative" width="100%" height="100%">
                            {drawerOpen && (
                                <Box
                                    position="absolute"
                                    top={0}
                                    left={0}
                                    width="100%"
                                    height="100%"
                                    zIndex={1}
                                />
                            )}
                            <MapJeepRoutes selectedJeepney={selectedJeepney} />
                            <Box
                                position="absolute"
                                top={50}
                                left="2.5%"
                                transform="translateX(-50%)"
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={
                                        isMobile
                                            ? toggleDrawer(true)
                                            : undefined
                                    }
                                >
                                    {isMobile
                                        ? "Show Jeepneys"
                                        : "Interact with Map"}
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            ) : (
                <Grid
                    container
                    paddingTop={"70px"}
                    paddingBottom={"70px"}
                    style={{ height: "calc(100vh - 70px)" }}
                >
                    <Grid item xs={2}>
                        <Box>{jeepneyList()}</Box>
                    </Grid>
                    <Grid item xs={10}>
                        <MapJeepRoutes selectedJeepney={selectedJeepney} />
                    </Grid>
                </Grid>
            )}
        </>
    );
}

export default JeepRoutes;
