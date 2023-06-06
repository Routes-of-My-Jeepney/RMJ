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
            setSnackBarId(0);
            setSnackbarOpen1(true);
            setSnackbarMessage1(res.errors.password);
            setStatus1("error");
        } else {
            setSnackBarId(1);
            setSnackbarOpen(true);
            setSnackbarMessage(res.errors.email);
            setStatus("error");
            setSnackbarOpen1(true);
            setSnackbarMessage1(res.errors.password);
            setStatus1("error");
        }
    };

    return (
        <>
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
        </>
    );
}
