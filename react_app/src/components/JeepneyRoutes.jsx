import React, { useState, useEffect, useContext } from "react";

import LikeButton from "./LikeButton";
import JeepneyMap from "./JeepneyMap";
import JeepneyList from "./JeepneyList";
import UserContext from "../contexts/UserContext";
import { JeepneyProvider, useJeepneyContext } from "../contexts/JeepneyContext";
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

import { useVisualContext } from "../contexts/VisualContext";

function JeepneyRoutes() {
    const [open, setOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { isMobile } = useVisualContext();
    const { jeepneys, selectedJeepney } = useJeepneyContext();

    const toggleDrawer = (open) => (event) => {
        setDrawerOpen(open);
    };

    // useEffect(
    //     () => async () => {
    //         await getCSRFToken();
    //         axios
    //             .get(`/api/jeepneys`)
    //             .then((response) => {
    //                 setJeepneys(response.data);
    //             })
    //             .catch((error) => {
    //                 console.error(error);
    //             });
    //     },
    //     []
    // );

    return (
        <>
            {isMobile ? (
                <Grid container style={{ height: "100vh" }}>
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
                                    <JeepneyList />
                                </SwipeableDrawer>
                            </Box>
                        )}
                        <Box
                            display="flex"
                            position="relative"
                            width="100%"
                            paddingTop="19px"
                            height="90%"
                            alignContent="center"
                        >
                            {/* {drawerOpen && (
                                <Box
                                    position="absolute"
                                    top={0}
                                    left={0}
                                    width="100%"
                                    height="100%"
                                    zIndex={1}
                                />
                            )} */}
                            <JeepneyMap setDrawerOpen={setDrawerOpen} />
                            <Box
                                position="absolute"
                                top={75}
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
                <Grid container paddingTop={"64px"} style={{ height: "100vh" }}>
                    <Grid item xs={2}>
                        <Box>
                            <JeepneyList />
                        </Box>
                    </Grid>
                    <Grid item xs={10}>
                        <JeepneyMap selectedJeepney={selectedJeepney} />
                    </Grid>
                </Grid>
            )}
        </>
    );
}

export default JeepneyRoutes;
