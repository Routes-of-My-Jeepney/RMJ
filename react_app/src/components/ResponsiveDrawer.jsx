import * as React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsBus from "@mui/icons-material/DirectionsBus";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const drawerWidth = "25vw";

function ResponsiveDrawer({ open }) {
    const routesLink = "/jeepneys";
    const mapLink = "/";
    const howToRideLink = "/how-to-ride";

    const drawer = (
        <List sx={{ padding: "100px 0" }}>
            <ListItem>
                <ListItemButton label="Map" component={Link} to={mapLink}>
                    <ListItemIcon>
                        <LocationOnIcon />
                    </ListItemIcon>
                    <ListItemText
                        primaryTypographyProps={{ fontSize: "24px" }}
                        primary="Map"
                    ></ListItemText>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton label="Routes" component={Link} to={routesLink}>
                    <ListItemIcon>
                        <DirectionsBus />
                    </ListItemIcon>
                    <ListItemText
                        primaryTypographyProps={{ fontSize: "24px" }}
                        primary="Routes"
                    ></ListItemText>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton
                    label="How To"
                    component={Link}
                    to={howToRideLink}
                >
                    <ListItemIcon>
                        <HelpOutlineIcon />
                    </ListItemIcon>
                    <ListItemText
                        primaryTypographyProps={{ fontSize: "24px" }}
                        primary="How To"
                    ></ListItemText>
                </ListItemButton>
            </ListItem>
        </List>
    );

    return (
        <Box>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        bgcolor: "silver",
                    },
                }}
                open={open}
            >
                {drawer}
            </Drawer>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    window: PropTypes.func,
};

export default ResponsiveDrawer;
