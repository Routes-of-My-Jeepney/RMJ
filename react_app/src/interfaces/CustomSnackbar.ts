import { AlertColor } from "@mui/material";

export interface CustomSnackbarProps {
    open: boolean;
    message: string;
    severity: string;
    handleClose: () => void; // This function doesn't take any arguments and doesn't return anything.
    style?: React.CSSProperties;
}

export interface SnackbarState {
    open: boolean;
    message: string;
    severity: AlertColor;
}
