import React from "react";
import { Snackbar, Alert } from "@mui/material";
// import MuiAlert from "@mui/material/Alert";

//
// function Alert(props) {
//     return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

export default function CustomSnackbar({ open, handleClose, message, type }) {
    const severity = ["error", "info", "success", "warning"].includes(type)
        ? type
        : "info";
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
}
