import { List, ListItem, ListItemText, Popper, Paper } from "@mui/material";
import "../styles/MapPage.scss";

const CustomDropdown = ({ anchorEl, options, open, handleSelect }) => {
    const handleClick = (value) => {
        handleSelect(value);
    };

    return (
        <Popper open={open} anchorEl={anchorEl} className="custom-dropdown">
            <Paper>
                <List>
                    {options.slice(0, 3).map((option, index) => (
                        <ListItem
                            button
                            key={index}
                            onClick={() => handleClick(option)}
                        >
                            <ListItemText primary={option} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Popper>
    );
};

export default CustomDropdown;
