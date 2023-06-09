import React, { useState } from "react";
import { TextField, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import getCSRFToken from "../utils/getCSRFToken";
import axios from "../axios";

function EditIconField({ initialText, jeepney, setJeepneys }) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(initialText);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (event) => {
        setText(event.target.value);
    };

    const handleInputBlur = async () => {
        setIsEditing(false);
        try {
            await getCSRFToken();
            const response = await axios.post(
                `/api/jeepney/${jeepney.id}/update`,
                {
                    custom_name: text,
                }
            );
            setJeepneys(response.data.jeepneys);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {isEditing && (
                <TextField
                    value={text}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    autoFocus
                />
            )}
            {/* {isEditing ? (
                <TextField
                    value={text}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    autoFocus
                />
            ) : (
                <span></span>
            )} */}
            <IconButton onClick={handleEditClick}>
                <EditIcon />
            </IconButton>
        </div>
    );
}

export default EditIconField;
