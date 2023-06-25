import React, { useContext, createContext, useState } from "react";

export const SnackbarContext = createContext();

export function SnackbarProvider({ children }) {
    const [snackbars, setSnackbars] = useState([]);

    const openSnackbar = (message, severity) => {
        setSnackbars((currentSnackbars) => [
            ...currentSnackbars,
            {
                open: true,
                message,
                severity,
            },
        ]);
    };

    const closeSnackbar = (index) => {
        setSnackbars((currentSnackbars) =>
            currentSnackbars.filter((_, i) => i !== index)
        );
    };

    const value = {
        snackbars,
        openSnackbar,
        closeSnackbar,
    };

    return (
        <SnackbarContext.Provider value={value}>
            {children}
        </SnackbarContext.Provider>
    );
}

export function useSnackbarContext() {
    return useContext(SnackbarContext);
}
