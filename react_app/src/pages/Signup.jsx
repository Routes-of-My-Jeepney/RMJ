import React, { useState, useContext } from "react";
import axios from "axios";
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
import UserContext from "../contexts/UserContext";
import CustomSnackbar from "../components/CustomSnackbar";

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
        id: {},
    });
    const { register } = useContext(UserContext);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (
            name !== "" &&
            email !== "" &&
            password !== "" &&
            passwordConfirmation !== ""
        ) {
            try {
                await register(name, email, password, passwordConfirmation);
                error === !true;
                showAlert("アカウントの作成に成功しました", "success");
            } catch (error) {
                console.log(error);
                showAlert("アカウントの登録に失敗しました", "error");
            }
        } else {
            showAlert("必要な情報を入力してください。", "error", 0);
        }
    };

    const showAlert = (message, type, id) => {
        setAlert({ open: true, message, type, id });
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlert({ ...alert, open: false });
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
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
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
                    id={alert.id}
                    />
                </Paper>
            </Grid>                
        </Grid>
    );
}
