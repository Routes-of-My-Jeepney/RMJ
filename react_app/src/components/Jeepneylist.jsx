import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    ListSubheader,
    FormControlLabel,
    Switch,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import InboxIcon from "@mui/icons-material/Inbox";
import EditIconField from "./EditIconField";
import { useJeepneyContext } from "../contexts/JeepneyContext";
import LikeButton from "./LikeButton";

const JeepneyList = () => {
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
    const toggleFavorites = () => {
        setShowOnlyFavorites(!showOnlyFavorites);
    };
    const handleClick = () => {
        setOpen(!open);
    };
    const { jeepneys, handleJeepneyClick } = useJeepneyContext();

    return (
        <List
            sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
            }}
            component="nav"
            // aria-labelledby="nested-list-subheader"
            // subheader={
            //     <ListSubheader component="div" id="nested-list-subheader">
            //         Nested List Items
            //     </ListSubheader>
            // }
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
            {/* <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit></Collapse> */}

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
                                ? jeepney.liked_by_users[0].pivot.custom_name
                                : jeepney.name}
                        </ListItemButton>
                        <LikeButton
                            jeepney={jeepney}
                            // userId={user.id}
                            // initialIsFavorite={
                            //     jeepney.isFavorite
                            // }
                        />
                        {showOnlyFavorites && (
                            <EditIconField
                                initialText={
                                    jeepney.liked_by_users.length > 0 &&
                                    jeepney.liked_by_users[0].pivot &&
                                    jeepney.liked_by_users[0].pivot.custom_name
                                        ? jeepney.liked_by_users[0].pivot
                                              .custom_name
                                        : jeepney.name
                                }
                                jeepney={jeepney}
                            />
                        )}
                    </List>
                ))}
        </List>
    );
};

export default JeepneyList;
