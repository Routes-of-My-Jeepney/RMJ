import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { right } from "@popperjs/core";
// import MuiAlert from "@mui/material/Alert";

//
// function Alert(props) {
//     return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

export default function CustomSnackbar({
    id,
    open,
    handleClose,
    message,
    type,
}) {
    const severity = ["error", "info", "success", "warning"].includes(type)
        ? type
        : "info";

    const anchorOrigin = {
        vertical: "top",
        horizontal: "right",
    };

    const styles = {
        marginTop: 55 * id + 50, // 各Snackbarの位置を70ピクセルずつずらす
    };
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={anchorOrigin}
            style={styles}
        >
            <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
}
