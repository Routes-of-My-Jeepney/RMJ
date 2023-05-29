import React, { useState, useContext } from "react";
import axios from "axios";
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
import UserContext from "../contexts/UserContext";

axios.defaults.withCredentials = true;

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const { register } = useContext(UserContext);

    const handleRegister = async (e) => {
        e.preventDefault();
        await register(name, email, password, passwordConfirmation);
    };

    return (
        <Grid container justify="center" style={{ paddingTop: "40%" }}>
            <Paper style={{ padding: 16 }}>
                <Typography variant="h4">Sign Up</Typography>
                <form onSubmit={handleRegister}>
                    <TextField
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
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
                    <TextField
                        type="password"
                        placeholder="Confirm Password"
                        value={passwordConfirmation}
                        onChange={(e) =>
                            setPasswordConfirmation(e.target.value)
                        }
                    />
                    <Button
                        onClick={handleRegister}
                        variant="contained"
                        color="primary"
                    >
                        Sign Up
                    </Button>
                </form>
            </Paper>
        </Grid>
    );
}
