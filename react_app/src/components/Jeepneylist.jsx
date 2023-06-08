import React, { useState, useEffect, useContext } from "react";
import axios from "../axios";
import LikeButton from "./LikeButton";
import MapJeepRoutes from "./MapJeepRoutes";
import UserContext from "../contexts/UserContext";
import getCSRFToken from "../utils/getCSRFToken";
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

    const handleClick = () => {
        setOpen(!open);
    };

    const handleJeepneyClick = (selectedJeepney) => {
        setSelectedJeepney(selectedJeepney);
    };
    const toggleFavorites = () => {
        setShowOnlyFavorites(!showOnlyFavorites);
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
            <Grid
                container
                paddingTop={"70px"}
                paddingBottom={"70px"}
                style={{ height: "calc(100vh - 70px)" }}
            >
                <Grid item xs={2}>
                    <Box>
                        <List
                            sx={{
                                width: "100%",
                                maxWidth: 360,
                                bgcolor: "background.paper",
                            }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            subheader={
                                <ListSubheader
                                    component="div"
                                    id="nested-list-subheader"
                                >
                                    Nested List Items
                                </ListSubheader>
                            }
                        >
                            <button onClick={toggleFavorites}>
                                Toggle Favorites
                            </button>
                            <ListItemButton onClick={handleClick}>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="Inbox" />
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse
                                in={open}
                                timeout="auto"
                                unmountOnExit
                            ></Collapse>

                            {jeepneys
                                .filter(
                                    (jeepney) =>
                                        !showOnlyFavorites || jeepney.isLiked
                                )
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
                                            onClick={() =>
                                                handleJeepneyClick(jeepney)
                                            }
                                        >
                                            {showOnlyFavorites &&
                                            jeepney.liked_by_users.length > 0 &&
                                            jeepney.liked_by_users[0].pivot &&
                                            jeepney.liked_by_users[0].pivot
                                                .custom_name
                                                ? jeepney.liked_by_users[0]
                                                      .pivot.custom_name
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
                                                    jeepney.liked_by_users
                                                        .length > 0 &&
                                                    jeepney.liked_by_users[0]
                                                        .pivot &&
                                                    jeepney.liked_by_users[0]
                                                        .pivot.custom_name
                                                        ? jeepney
                                                              .liked_by_users[0]
                                                              .pivot.custom_name
                                                        : jeepney.name
                                                }
                                                jeepney={jeepney}
                                                setJeepneys={setJeepneys}
                                            />
                                        )}
                                    </List>
                                ))}
                        </List>
                    </Box>
                </Grid>
                <Grid item xs={10}>
                    <MapJeepRoutes selectedJeepney={selectedJeepney} />
                </Grid>
            </Grid>
        </>
    );
}

export default JeepRoutes;
