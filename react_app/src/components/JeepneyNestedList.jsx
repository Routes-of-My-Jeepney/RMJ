import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    ListSubheader,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export default function NestedList() {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

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
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit></Collapse>
            <List component="div" disablePadding>
                <ListItemButton
                    variant="contained"
                    key={jeepney.id}
                    onClick={() => handleJeepneyClick(jeepney)}
                >
                    {jeepney.name}
                </ListItemButton>
            </List>
        </List>
    );
}
