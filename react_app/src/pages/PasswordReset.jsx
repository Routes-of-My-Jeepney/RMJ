import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
import UserContext from "../contexts/UserContext";
import CustomSnackbar from "../components/CustomSnackbar";
import getCSRFToken from "../utils/getCSRFToken";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

export default function ResetPasswordPage() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const { isLoggedIn, getUser } = useContext(UserContext);
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({
        password: "",
    });

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
        id: 1,
    });

    const showAlert = (message, type) => {
        setAlert({ open: true, message, type });
    };
    const showAlert1 = (message, type) => {
        setAlert1({ open: true, message, type });
    };
    const showAlert2 = (message, type) => {
        setAlert2({ open: true, message, type });
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

    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await getCSRFToken();
            const data = new FormData();
            data.append("_method", "post");
            data.append("currentPassword", currentPassword); // 現在のパスワードを追加
            data.append("newPassword", newPassword); // 新しいパスワードを追加
            const response = await axios.post(
                "http://localhost:8000/api/reset-password",
                data
            );
            console.log(response);
            showAlert("パスワードの変更に成功しました", "success");
            navigate("/");
        } catch (error) {
            console.log(error);
            if (!error.response.data.errors) {
                showAlert(error.response.data.message, "error");
            } else if (!error.response.data.errors) {
                showAlert(error.response.data.error, "error");
            } else if (
                error.response.data.errors.currentPassword &&
                error.response.data.errors.newPassword.length >= 2
            ) {
                showAlert(
                    error.response.data.errors.currentPassword[0],
                    "error"
                );
                showAlert1(error.response.data.errors.newPassword[0], "error");
                showAlert2(error.response.data.errors.newPassword[1], "error");
            } else if (
                !error.response.data.errors.currentPassword &&
                error.response.data.errors.newPassword.length >= 2
            ) {
                showAlert(error.response.data.errors.newPassword[0], "error");
                showAlert1(error.response.data.errors.newPassword[1], "error");
            } else if (!error.response.data.errors.currentPassword) {
                showAlert(error.response.data.errors.newPassword[0], "error");
            } else if (!error.response.data.errors.newPassword) {
                showAlert(error.response.data.errors.currentPassword, "error");
            } else {
                showAlert(error.response.data.errors.currentPassword, "error");
                showAlert1(error.response.data.errors.newPassword, "error");
            }
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            const user = JSON.parse(localStorage.getItem("user"));
            setUser(user);
            setFormData({
                password: user.password,
            });
            console.log(user);
        }
    }, []);

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
                        Password Reset
                    </Typography>
                    <form onSubmit={handleResetPassword}>
                        <TextField
                            type="password"
                            placeholder="Current Password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
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
                            Reset Password
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
                        id={1}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
}
