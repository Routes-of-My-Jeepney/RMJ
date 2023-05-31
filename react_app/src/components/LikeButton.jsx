import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "../axios";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import getCSRFToken from "../utils/getCSRFToken";

function LikeButton({ jeepney, setJeepneys, jeepneys }) {
    // function LikeButton({ jeepneyId, userId, initialIsFavorite }) {
    // const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
    const { user } = useContext(UserContext);

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
                console.log(response.data);
                setJeepneys(response.data.jeepneys);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleUnlike = async (jeepney) => {
        await getCSRFToken();
        axios
            .delete(`/api/jeepney/${jeepney.id}/dislike`, {
                jeepney_id: jeepney.id,
            })
            .then((response) => {
                console.log(response.data);
                setJeepneys(response.data.jeepneys);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // useEffect(() => {
    //     // fetch the favorite status from the API when the component mounts
    //     axios
    //         .get(`/user/liked-jeepneys`)

    //         .then((response) => {
    //             setIsFavorite(response.data.isFavorite);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }, [jeepney]);

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
