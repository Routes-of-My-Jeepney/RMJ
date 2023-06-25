import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Snackbar, ThemeProvider } from "@mui/material";
import UserProvider from "./contexts/UserProvider";
import theme from "./utils/theme";
import { VisualProvider } from "./contexts/VisualContext";
import { SnackbarProvider } from "./contexts/SnackbarContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <VisualProvider>
                    <SnackbarProvider>
                        <UserProvider>
                            <App />
                        </UserProvider>
                    </SnackbarProvider>
                </VisualProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
