import * as React from "react";
import { AppBar, Typography, Toolbar, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
const pages = ["Home", "HowtoRide", "Routes"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
});

function Navbar() {
    return (
        <AppBar>
            <StyledToolbar>
                <Typography variant="h6">RMJ</Typography>
                <Avatar></Avatar>
            </StyledToolbar>
        </AppBar>
    );
}
export default Navbar;
