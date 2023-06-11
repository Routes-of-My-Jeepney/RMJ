import { AlertColor } from "@mui/material";

export interface CustomSnackbarProps {
    open: boolean;
    handleClose: () => void;
    message: string;
    type: AlertColor;
}

export interface SnackbarState {
    open: boolean;
    message: string;
    type: AlertColor;
}
