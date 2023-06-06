import React, { useState, useContext } from "react";
import axios from "axios";
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
import UserContext from "../contexts/UserContext";
import CustomSnackbar from "../components/CustomSnackbar";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        type: "",
        id: 0,
    });
    const [alert1, setAlert1] = useState({
        open: false,
        message: "",
        type: "",
        id: 1,
    });
    const [alert2, setAlert2] = useState({
        open: false,
        message: "",
        type: "",
        id: 2,
    });
    const [alert3, setAlert3] = useState({
        open: false,
        message: "",
        type: "",
        id: 3,
    });
    const { register } = useContext(UserContext);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (
            name !== "" &&
            email !== "" &&
            password !== "" &&
            passwordConfirmation !== ""
        ) {
            const res = await register(
                name,
                email,
                password,
                passwordConfirmation
            );
            console.log(res);
            if (res === "アカウントの作成に成功しました") {
                await register(name, email, password, passwordConfirmation);
                showAlert("アカウントの作成に成功しました", "success");
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else if (!res.errors) {
                showAlert(error.response.data.error, "error");
            } else if (
                res.errors.password &&
                !res.errors.name &&
                !res.errors.name
            ) {
                let i = 0;
                if (i < res.errors.password.length) {
                    showAlert(res.errors.password[0], "error");
                }
                i++;
                if (i < res.errors.password.length) {
                    showAlert1(res.errors.password[1], "error");
                }
                i++;
                if (i < res.errors.password.length) {
                    showAlert2(res.errors.password[2], "error");
                }
                i++;
                if (i < res.errors.password.length) {
                    showAlert(res.errors.password[3], "error");
                }
            } else if (!res.errors.email) {
                showAlert(res.errors.name, "error");
                let i = 0;
                if (i < res.errors.password.length) {
                    showAlert1(res.errors.password[0], "error");
                }
                i++;
                if (i < res.errors.password.length) {
                    showAlert2(res.errors.password[1], "error");
                }
                i++;
                if (i < res.errors.password.length) {
                    showAlert3(res.errors.password[2], "error");
                }
            } else if (!res.errors.name) {
                showAlert(res.errors.email, "error");
                let i = 0;
                if (i < res.errors.password.length) {
                    showAlert1(res.errors.password[0], "error");
                }
                i++;
                if (i < res.errors.password.length) {
                    showAlert2(res.errors.password[1], "error");
                }
                i++;
                if (i < res.errors.password.length) {
                    showAlert3(res.errors.password[2], "error");
                }
            } else {
                console.log(error);
            }
        } else {
            showAlert("必要な情報を入力してください。", "error");
        }
    };

    const showAlert = (message, type) => {
        setAlert({ open: true, message, type });
    };
    const showAlert1 = (message, type) => {
        setAlert1({ open: true, message, type });
    };
    const showAlert2 = (message, type) => {
        setAlert2({ open: true, message, type });
    };
    const showAlert3 = (message, type) => {
        setAlert3({ open: true, message, type });
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlert({ ...alert, open: false });
    };

    const handleCloseAlert1 = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlert1({ ...alert, open: false });
    };

    const handleCloseAlert2 = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlert2({ ...alert, open: false });
    };

    const handleCloseAlert3 = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlert3({ ...alert, open: false });
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
                        Sign Up
                    </Typography>
                    <form onSubmit={handleRegister}>
                        <TextField
                            type="text"
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
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
                        <TextField
                            type="password"
                            label="Confirm Password"
                            value={passwordConfirmation}
                            onChange={(e) =>
                                setPasswordConfirmation(e.target.value)
                            }
                            fullWidth
                            margin="normal"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            sx={{ marginTop: 2 }}
                        >
                            Sign Up
                        </Button>
                    </form>
                    <CustomSnackbar
                        open={alert.open}
                        handleClose={handleCloseAlert}
                        message={alert.message}
                        type={alert.type}
                        id={0}
                    />
                    <CustomSnackbar
                        open={alert1.open}
                        handleClose={handleCloseAlert1}
                        message={alert1.message}
                        type={alert1.type}
                        id={1}
                    />
                    <CustomSnackbar
                        open={alert2.open}
                        handleClose={handleCloseAlert2}
                        message={alert2.message}
                        type={alert2.type}
                        id={2}
                    />
                    <CustomSnackbar
                        open={alert3.open}
                        handleClose={handleCloseAlert3}
                        message={alert3.message}
                        type={alert3.type}
                        id={3}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
}
