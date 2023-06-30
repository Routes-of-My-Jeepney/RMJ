import React, { useState } from "react";
import { TextField, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import getCSRFToken from "../utils/getCSRFToken";
import axios from "../axios";
import { useJeepneyContext } from "../contexts/JeepneyContext";

function EditIconField({ initialText, jeepney }) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(initialText);
    const { setJeepneys } = useJeepneyContext();

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
