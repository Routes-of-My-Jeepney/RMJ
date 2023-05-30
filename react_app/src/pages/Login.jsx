import React, { useState, useContext } from "react";
import axios from "axios";
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
import getCSRFToken from "../utils/getCSRFToken";
import UserContext from "../contexts/UserContext";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(UserContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <Grid container justify="center" style={{ paddingTop: "40%" }}>
            <Paper style={{ padding: 16 }}>
                <Typography variant="h4">Login</Typography>
                <form onSubmit={login}>
                    <TextField
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        onClick={handleLogin}
                        variant="contained"
                        color="primary"
                    >
                        Log In
                    </Button>
                </form>
            </Paper>
        </Grid>
    );
}
