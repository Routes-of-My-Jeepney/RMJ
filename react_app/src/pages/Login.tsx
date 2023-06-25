import React, { useReducer, useContext, FormEvent } from "react";
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { SnackbarState } from "../interfaces/CustomSnackbar";
import { useSnackbarContext } from "../contexts/SnackbarContext";

type State = {
    email: string;
    password: string;
};

type Action =
    | { type: "setEmail"; payload: string }
    | { type: "setPassword"; payload: string };

const initialState: State = {
    email: "",
    password: "",
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "setEmail":
            return { ...state, email: action.payload };
        case "setPassword":
            return { ...state, password: action.payload };
        default:
            return state;
    }
};

export default function LoginPage() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { login } = useContext(UserContext);
    const { openSnackbar } = useSnackbarContext();
    const navigate = useNavigate();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        await login(state.email, state.password); // Add await here
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
                    <form onSubmit={handleLogin}>
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
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginTop: 2 }}
                        >
                            Log In
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
}
