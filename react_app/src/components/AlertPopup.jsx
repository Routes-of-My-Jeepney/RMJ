import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

export default function AlertPopup() {
    const [showAlert, setShowAlert] = useState(false);

    const handleAlertShow = () => {
        setShowAlert(true);
    };
    return (
        <>
            {showAlert && (
                <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">
                        <AlertTitle>Info</AlertTitle>
                        {message}
                    </Alert>
                </Stack>
            )}
            <button onClick={handleAlertShow}>Show Alert</button>
        </>
    );
}
