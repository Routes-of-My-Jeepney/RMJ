import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import getCSRFToken from "../utils/getCSRFToken";

const Logout = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <Button onClick={handleLogout} variant="contained" color="primary">
            Log Out
        </Button>
    );
};

export default Logout;
