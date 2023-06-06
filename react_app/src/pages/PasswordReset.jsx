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
    const [alert, setAlert] = useState({ open: false, message: "", type: "" });
    const { isLoggedIn, getUser } = useContext(UserContext);
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({
        password: "",
    });
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
            console.log(error.response);
            showAlert(
                "パスワードの変更に失敗しました。大文字、小文字、記号を含む8文字以上に設定してください。",
                "error"
            );
        }
    };

    const showAlert = (message, type) => {
        setAlert({ open: true, message, type });
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlert({ ...alert, open: false });
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
        <Grid container justify="center" style={{ paddingTop: "40%" }}>
            <Paper style={{ padding: 16 }}>
                <Typography variant="h4">Password Reset</Typography>
                <form onSubmit={handleResetPassword}>
                    <TextField
                        type="password"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <TextField
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Button variant="contained" color="primary" type="submit">
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
            </Paper>
        </Grid>
    );
}