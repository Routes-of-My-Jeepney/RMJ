import React, { FC } from "react";
import { Snackbar } from "@mui/material";
import { right } from "@popperjs/core";
import { CustomSnackbarProps } from "../interfaces/CustomSnackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackbar: FC<CustomSnackbarProps> = ({
    open,
    message,
    severity,
    handleClose,
    style,
}) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            style={{ marginTop: "50px", ...style }}
        >
            <Alert
                open={open}
                //onClose={handleClose}
                severity={severity}
                sx={{ width: "100%" }}
                style={style}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackbar;
