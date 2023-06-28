import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    GoogleMap,
    LoadScript,
    MarkerF,
    DirectionsRenderer,
} from "@react-google-maps/api";
import PlacesAutoComplete from "./PlacesAutoComplete";
import { Box } from "@mui/material";
import { useSnackbarContext } from "../contexts/SnackbarContext";
import LoadingCircle from "./LoadingCircle";

const containerStyle = {
    width: "100%",
    height: "100vh",
};

function MapContainer() {
    const mapRef = useRef();
    const [center, setCenter] = useState();
    const [MarkerPosition, setMarkerPosition] = useState();
    const [icon, setIcon] = useState(false);
    const { openSnackbar } = useSnackbarContext();

    const loading = useSelector((state) => state.loading);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch({ type: "SET_LOADING", payload: true });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coords = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setCenter(coords);
                    setMarkerPosition(coords);
                    mapRef.current.panTo(coords);
                    dispatch({ type: "SET_LOADING", payload: false });
                },
                (error) => {
                    openSnackbar(error.message, "error");
                }
            );
        } else {
            openSnackbar(
                "Geolocation is not supported by this browser.",
                "error"
            );
        }
    }, []);

    // useEffect(() => {
    //   console.log('MarkerPosition updated:', MarkerPosition);
    // }, [MarkerPosition])

    const onLoad = React.useCallback((map) => (mapRef.current = map), []);
    const MarkaerPosition = (newValue) => {
        setText(newValue);
    };

    return (
        <>
            <GoogleMap
                id="map"
                ref={mapRef}
                mapContainerStyle={containerStyle}
                center={center}
                zoom={20}
                onLoad={onLoad}
            >
                {loading && <LoadingCircle />}
                <PlacesAutoComplete
                    mapRef={mapRef}
                    setIcon={setIcon}
                    setCenter={setCenter}
                    setMarkerPosition={setMarkerPosition}
                />
                {/* {directions && (
                        <DirectionsRenderer
                            directions={directions}
                            options={{
                                polylineOptions: {
                                    strokeColor: "blue",
                                    strokeOpacity: 0.8,
                                    strokeWeight: 4,
                                },
                            }}
                        />
                    )} */}
                {!icon && <MarkerF position={MarkerPosition} />}
                {icon && (
                    <MarkerF
                        position={MarkerPosition}
                        icon={
                            "https://maps.google.com/mapfiles/ms/micons/bus.png"
                        }
                    />
                )}
            </GoogleMap>
        </>
    );
}

export default MapContainer;
