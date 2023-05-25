import React, { useState, useEffect } from "react";
import axios from "axios";
import LikeButton from "./LikeButton";
import MapJeepRoutes from "./MapJeepRoutes";
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

function JeepRoutes({ userId }) {
    const [jeepneys, setJeepneys] = useState([]);
    const [selectedJeepney, setSelectedJeepney] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleJeepneyClick = (selectedJeepney) => {
        setSelectedJeepney(selectedJeepney);
    };

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/api/jeepneys`)
            .then((response) => {
                setJeepneys(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

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

                            {jeepneys.map((jeepney) => (
                                <List component="div" disablePadding>
                                    <ListItemButton
                                        variant="contained"
                                        key={jeepney.id}
                                        onClick={() =>
                                            handleJeepneyClick(jeepney)
                                        }
                                    >
                                        {jeepney.name}
                                    </ListItemButton>
                                </List>
                            ))}
                        </List>

                        {/* <LikeButton
                        selectedJeepney={jeepney.id}
                        userId={userId}
                        initialIsFavorite={jeepney.isFavorite}
                    /> */}
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
