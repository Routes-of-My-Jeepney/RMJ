import React, { useState } from "react";
import axios from "axios";
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";

axios.defaults.withCredentials = true;

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const register = async () => {
        try {
            await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/sanctum/csrf-cookie`
            );
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/register`,
                {
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: passwordConfirmation,
                }
            );

            // Handle successful registration
            console.log(response.data);
        } catch (error) {
            // Handle error during registration
            if (error.response && error.response.status === 422) {
                console.error(error.response.data.errors);
            } else {
                console.error(error);
            }
        }
    };

    return (
        <Grid container justify="center" style={{ paddingTop: "40%" }}>
            <Paper style={{ padding: 16 }}>
                <Typography variant="h4">Sign Up</Typography>
                <form onSubmit={register}>
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
                        onClick={register}
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
