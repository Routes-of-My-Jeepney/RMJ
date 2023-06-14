import React, { useState, useContext, useReducer, FormEvent } from "react";
import axios from "../axios";
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
import UserContext from "../contexts/UserContext";
import CustomSnackbar from "../components/CustomSnackbar";
import { useNavigate } from "react-router-dom";
import { SnackbarState } from "../interfaces/CustomSnackbar";

type State = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    snackbars: SnackbarState[];
};

type Action =
    | { type: "setName"; payload: string }
    | { type: "setEmail"; payload: string }
    | { type: "setPassword"; payload: string }
    | { type: "setPasswordConfirmation"; payload: string }
    | { type: "setSnackbar"; payload: SnackbarState[] };

const initialState: State = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    snackbars: [],
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "setName":
            return { ...state, name: action.payload };
        case "setEmail":
            return { ...state, email: action.payload };
        case "setPassword":
            return { ...state, password: action.payload };
        case "setPasswordConfirmation":
            return { ...state, passwordConfirmation: action.payload };
        case "setSnackbar":
            return { ...state, snackbars: action.payload };
        default:
            return state;
    }
};

export default function SignupPage() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { register } = useContext(UserContext);
    const navigate = useNavigate();

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await register(
                state.name,
                state.email,
                state.password,
                state.passwordConfirmation
            );
            dispatch({
                type: "setSnackbar",
                payload: [
                    ...state.snackbars,
                    {
                        open: true,
                        message: res,
                        type: "success",
                    },
                ],
            });
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            dispatch({
                type: "setSnackbar",
                payload: [
                    ...state.snackbars,
                    {
                        open: true,
                        message: error.message,
                        type: "error",
                    },
                ],
            });
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
                        Sign Up
                    </Typography>
                    <form onSubmit={handleRegister}>
                        <TextField
                            type="text"
                            label="Name"
                            value={state.name}
                            onChange={(e) =>
                                dispatch({
                                    type: "setName",
                                    payload: e.target.value,
                                })
                            }
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            type="email"
                            label="Email"
                            value={state.email}
                            onChange={(e) =>
                                dispatch({
                                    type: "setEmail",
                                    payload: e.target.value,
                                })
                            }
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            type="password"
                            label="Password"
                            value={state.password}
                            onChange={(e) =>
                                dispatch({
                                    type: "setPassword",
                                    payload: e.target.value,
                                })
                            }
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            type="password"
                            label="Confirm Password"
                            value={state.passwordConfirmation}
                            onChange={(e) =>
                                dispatch({
                                    type: "setPasswordConfirmation",
                                    payload: e.target.value,
                                })
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
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "column-reverse",
                            gap: "16px",
                        }}
                    >
                        {state.snackbars.map((snackbar, index) => (
                            <CustomSnackbar
                                {...snackbar}
                                handleClose={() =>
                                    dispatch({
                                        type: "setSnackbar",
                                        payload: state.snackbars.filter(
                                            (_, i) => i !== index
                                        ),
                                    })
                                }
                            />
                        ))}
                    </div>
                </Paper>
            </Grid>
        </Grid>
    );
}