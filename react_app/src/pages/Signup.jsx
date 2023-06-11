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
    const [alerts, setAlerts] = useState(
        Array.from({ length: 4 }, () => ({
            open: false,
            message: "",
            type: "",
        }))
    );
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

            if (res === "アカウントの作成に成功しました") {
                showAlert(0, "アカウントの作成に成功しました", "success");
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else if (res.errors) {
                Object.entries(res.errors).forEach(([key, value], index) => {
                    showAlert(index, value[0], "error");
                });
            } else {
                showAlert(0, "必要な情報を入力してください。", "error");
            }
        }
    };

    const showAlert = (id, message, type) => {
        setAlerts((prevAlerts) => {
            const newAlerts = [...prevAlerts];
            newAlerts[id] = { open: true, message, type };
            return newAlerts;
        });
    };

    const handleCloseAlert = (id) => () => {
        setAlerts((prevAlerts) => {
            const newAlerts = [...prevAlerts];
            newAlerts[id].open = false;
            return newAlerts;
        });
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
                    {alerts.map((alert, id) => (
                        <CustomSnackbar
                            key={id}
                            open={alert.open}
                            handleClose={handleCloseAlert(id)}
                            message={alert.message}
                            type={alert.type}
                        />
                    ))}
                </Paper>
            </Grid>
        </Grid>
    );
}
