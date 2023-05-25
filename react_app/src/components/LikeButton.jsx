import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";

function LikeButton({ routeId, userId, initialIsFavorite }) {
    const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

    const handleLike = () => {
        setIsFavorite(true);
        axios
            .post(`${import.meta.env.VITE_API_BASE_URL}/api/favorites`, {
                route_id: routeId,
                user_id: userId,
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
                setIsFavorite(false); // rollback on error
            });
    };

    const handleUnlike = () => {
        setIsFavorite(false);
        axios
            .delete(
                `http://your-laravel-api-url/api/favorites/${userId}/${routeId}`
            )
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
                setIsFavorite(true); // rollback on error
            });
    };

    useEffect(() => {
        // fetch the favorite status from the API when the component mounts
        axios
            .get(
                `http://your-laravel-api-url/api/favorites/${userId}/${routeId}`
            )
            .then((response) => {
                setIsFavorite(response.data.isFavorite);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [routeId, userId]);

    return (
        <IconButton onClick={isFavorite ? handleUnlike : handleLike}>
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
    );
}

export default LikeButton;
