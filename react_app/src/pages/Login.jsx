import React, { useState, useContext } from "react";
import axios from "axios";
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
import getCSRFToken from "../utils/getCSRFToken";
import UserContext from "../contexts/UserContext";
import CustomSnackbar from "../components/CustomSnackbar";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    //成功アラート
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [status, setStatus] = useState();
    const [snackbarOpen1, setSnackbarOpen1] = useState(false);
    const [snackbarMessage1, setSnackbarMessage1] = useState("");
    const [status1, setStatus1] = useState();
    const [message, setMessage] = useState();
    const [snackBarId, setSnackBarId] = useState(0);

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await login(email, password);
        console.log(res);
        if (res === "ログインに成功しました。") {
            setSnackbarOpen(true);
            setSnackbarMessage(res);
            setStatus("success");
            setTimeout(() => {
                navigate("/");
            }, 1 * 1000);
        } else if (!res.errors) {
            setSnackbarOpen(true);
            setSnackbarMessage(res.message);
            setStatus("error");
        } else if (!res.errors.password) {
            setSnackbarOpen(true);
            setSnackbarMessage(res.errors.email);
            setStatus("error");
        } else if (!res.errors.email) {
            setSnackbarOpen1(true);
            setSnackbarMessage1(res.errors.password);
            setStatus1("error");
        } else {
            setSnackbarOpen(true);
            setSnackbarMessage(res.errors.email);
            setStatus("error");
            setSnackbarOpen1(true);
            setSnackbarMessage1(res.errors.password);
            setStatus1("error");
        }
    };

    return (
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                style={{ minHeight: "100vh" }}
            >
                <Grid item xs={10} sm={8} md={6} lg={4}>
                    <Paper elevation={3} style={{ padding: 16 }}>
                        <Typography variant="h6" align="center" gutterBottom>
                            Login
                        </Typography>
                        <form onSubmit={login}>
                            <TextField
                                type="email"
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                type="password"
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleLogin}
                                fullWidth
                                sx={{ marginTop: 2 }}
                            >
                                Log In
                            </Button>
                        </form>

                        <CustomSnackbar
                            id={0}
                            open={snackbarOpen}
                            handleClose={() => setSnackbarOpen(false)}
                            message={snackbarMessage}
                            type={status}
                        />

                        <CustomSnackbar
                            id={snackBarId}
                            open={snackbarOpen1}
                            handleClose={() => setSnackbarOpen1(false)}
                            message={snackbarMessage1}
                            type={status1}
                        />
                    </Paper>
                </Grid>
            </Grid>
    );
}
