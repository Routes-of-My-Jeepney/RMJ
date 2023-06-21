import React, { useReducer, useContext, FormEvent } from "react";
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
import UserContext from "../contexts/UserContext";
import { UserContextType } from "../interfaces/UserContext";
import CustomSnackbar from "../components/CustomSnackbar";
import { useNavigate } from "react-router-dom";
import { SnackbarState } from "../interfaces/CustomSnackbar";

type State = {
    email: string;
    password: string;
    snackbars: SnackbarState[];
};

type Action =
    | { type: "setEmail"; payload: string }
    | { type: "setPassword"; payload: string }
    | { type: "setSnackbar"; payload: SnackbarState[] };

const initialState: State = {
    email: "",
    password: "",
    snackbars: [],
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "setEmail":
            return { ...state, email: action.payload };
        case "setPassword":
            return { ...state, password: action.payload };
        case "setSnackbar":
            return { ...state, snackbars: action.payload };
        default:
            return state;
    }
};

export default function LoginPage() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { login }: UserContextType = useContext(UserContext) || {} as UserContextType;
    const navigate = useNavigate();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await login(state.email, state.password);
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
            }, 1 * 1000);
        } catch (error:any) {
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
    const showLoginPasswordButton = () => {
        const txtLoginPass = document.getElementById("textLoginPass") as HTMLInputElement;
        const btnEyeLoginPass = document.getElementById("buttonEyeLoginPass");
        if (txtLoginPass && btnEyeLoginPass) {
            if (txtLoginPass.type === "password") {
                txtLoginPass.type = "text";
                btnEyeLoginPass.className = "fa fa-eye";
            } else {
                txtLoginPass.type = "password";
                btnEyeLoginPass.className = "fa fa-eye-slash";
            }
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
                            id="textLoginPass"
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
                            InputProps={{
                                endAdornment: (<span
                                    id="buttonEyeLoginPass"
                                    className="fa fa-eye-slash"
                                    onClick={showLoginPasswordButton}>
                                </span>),
                            }}
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
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column-reverse",
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
