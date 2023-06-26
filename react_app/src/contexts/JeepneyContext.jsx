import React, { useEffect, useState, useContext, createContext } from "react";
import getCSRFToken from "../utils/getCSRFToken";
import axios from "../axios";

export const JeepneyContext = createContext();

export function JeepneyProvider({ children }) {
    const [jeepneys, setJeepneys] = useState([]);
    const [selectedJeepney, setSelectedJeepney] = useState(null);

    const handleJeepneyClick = (selectedJeepney) => {
        setSelectedJeepney(selectedJeepney);
    };

    // any other state or functions you want to share...
    useEffect(
        () => async () => {
            await getCSRFToken();
            axios
                .get(`/api/jeepneys`)
                .then((response) => {
                    setJeepneys(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        []
    );

    const value = {
        jeepneys,
        setJeepneys,
        selectedJeepney,
        handleJeepneyClick,
        setSelectedJeepney,
    };

    return (
        <JeepneyContext.Provider value={value}>
            {children}
        </JeepneyContext.Provider>
    );
}

export function useJeepneyContext() {
    return useContext(JeepneyContext);
}
