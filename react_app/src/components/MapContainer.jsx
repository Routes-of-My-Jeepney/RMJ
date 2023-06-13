import React, { useState, useEffect, useRef } from "react";
import {
    GoogleMap,
    LoadScript,
    MarkerF,
    DirectionsRenderer,
} from "@react-google-maps/api";
import PlacesAutoComplete from "./PlacesAutoComplete";
import { Box } from "@mui/material";

const containerStyle = {
    width: "100%",
    height: "100vh",
};

function MapContainer() {
    const mapRef = useRef();
    const [center, setCenter] = useState();
    const [MarkerPosition, setMarkerPosition] = React.useState();
    const [directions, setDirections] = useState(null);
    const [icon, setIcon] = useState(false);

    React.useEffect(() => {
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
                },
                (error) => {
                    console.log("Geolocation error", error);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
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
            <Box sx={{ position: "relative", height: "500px" }}>
                <GoogleMap
                    id="map"
                    ref={mapRef}
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={20}
                    onLoad={onLoad}
                >
                    <PlacesAutoComplete mapRef={mapRef} setIcon={setIcon} />
                    {directions && (
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
                    )}
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
            </Box>
        </>
    );
}

export default MapContainer;
