import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Paper, TextField, Typography, Button } from "@mui/material";
import { Grid } from "@mui/material/Unstable_Grid2";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const login = async () => {
        try {
            await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/sanctum/csrf-cookie`
            );
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/login`,
                {
                    email: email,
                    password: password,
                }
            );
            localStorage.setItem("authToken", response.data.token);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
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
                    <Button onClick={login} variant="contained" color="primary">
                        Log In
                    </Button>
                </form>
            </Paper>
        </Grid>
    );
}
