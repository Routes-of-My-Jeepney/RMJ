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
import { useState, useContext } from "react";
import InboxIcon from "@mui/icons-material/Inbox";
import EditIconField from "./EditIconField";
import { useJeepneyContext } from "../contexts/JeepneyContext";
import LikeButton from "./LikeButton";
import UserContext from "../contexts/UserContext";

const JeepneyList = () => {
    const { user } = useContext(UserContext);
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

    const toggleFavorites = () => {
        setShowOnlyFavorites(!showOnlyFavorites);
    };
    const handleClick = () => {
        setOpen(!open);
    };

    // This is a helper function to get the custom name of a jeepney for a user
    function getCustomName(jeepney, user_id) {
        // Find the user in the jeepney's liked_by_users array
        let user = jeepney.liked_by_users.find((user) => user.id === user_id);

        // If the user was found and they have a custom_name in their pivot data, return it
        if (showOnlyFavorites && user && user.pivot && user.pivot.custom_name) {
            return user.pivot.custom_name;
        }

        // If the user wasn't found, or they don't have a custom_name, return the jeepney's name
        return jeepney.name;
    }

    const { jeepneys, handleJeepneyClick } = useJeepneyContext();

    return (
        <List
            sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
                paddingTop: "63px",
            }}
            component="nav"
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
                            {getCustomName(jeepney, user.id)}
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
                                initialText={getCustomName(jeepney, user.id)}
                                jeepney={jeepney}
                            />
                        )}
                    </List>
                ))}
        </List>
    );
};

export default JeepneyList;
