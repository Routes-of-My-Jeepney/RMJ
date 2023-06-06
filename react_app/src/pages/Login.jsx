import React, { useState, useContext } from "react";
import axios from "axios";
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
import getCSRFToken from "../utils/getCSRFToken";
import UserContext from "../contexts/UserContext";
import CustomSnackbar from "../components/CustomSnackbar";
import AlertPopup from "../components/AlertPopup";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(UserContext);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [status, setStatus] = useState();
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            await login(email, password);
        } catch (error) {
            console.log(error);
            console.log("エラーが起きました！");
            setSnackbarOpen(true);
            setSnackbarMessage(
                "ユーザーID・パスワードに誤りがあるか、登録されていません。"
            );
            console.log("到達");
            return;
        }
    };

    return (
        <>
        <AlertPopup status={status} message={message}></AlertPopup>
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
                            sx={{ margin: "20px 0" }}
                        >
                            Log In
                        </Button>
                    </form>
                    <CustomSnackbar
                        open={snackbarOpen}
                        handleClose={() => setSnackbarOpen(false)}
                        message={snackbarMessage}
                        type="error"
                    />
                </Paper>
            </Grid>
        </Grid>
        </>
    );
}
