import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "../axios";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import getCSRFToken from "../utils/getCSRFToken";
import { useJeepneyContext } from "../contexts/JeepneyContext";
import { useSnackbarContext } from "../contexts/SnackbarContext";

function LikeButton({ jeepney }) {
    // function LikeButton({ jeepneyId, userId, initialIsFavorite }) {
    // const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
    const { user } = useContext(UserContext);
    const { setJeepneys, jeepneys } = useJeepneyContext();
    const { openSnackbar } = useSnackbarContext();

    const handleLike = async (jeepney) => {
        await getCSRFToken();
        axios
            .post(
                `/api/jeepney/${jeepney.id}/like`,

                {
                    jeepney_id: jeepney.id,
                    // user_id: user.id,
                }
            )
            .then((response) => {
                const updatedJeepney = response.data.jeepney;
                const updatedJeepneys = jeepneys.map((j) =>
                    j.id === updatedJeepney.id ? updatedJeepney : j
                );
                setJeepneys(updatedJeepneys);
            })
            .catch((error) => {
                openSnackbar(error.message, "error");
            });
    };

    const handleUnlike = async (jeepney) => {
        await getCSRFToken();
        axios
            .delete(`/api/jeepney/${jeepney.id}/dislike`, {
                jeepney_id: jeepney.id,
            })
            .then((response) => {
                const updatedJeepney = response.data.jeepney;

                // Create a new array with the updated jeepney replacing the old one
                const updatedJeepneys = jeepneys.map((j) =>
                    j.id === updatedJeepney.id ? updatedJeepney : j
                );

                // Update the state with the new array
                setJeepneys(updatedJeepneys);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <IconButton
            onClick={() => {
                jeepney.isLiked ? handleUnlike(jeepney) : handleLike(jeepney);
            }}
        >
            {jeepney.isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
    );
}

export default LikeButton;
