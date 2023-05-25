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

// 地名や住所の自動補完などの機能を使用するために、Google Maps JavaScript APIに places ライブラリを読み込むように指示するために必要な実装
const libraries = ["places"]; // Define libraries as a constant variable outside the component

function MapContainer() {
    const mapRef = useRef();
    const [center, setCenter] = useState();
    const [MarkerPosition, setMarkerPosition] = React.useState();
    const [directions, setDirections] = useState();

    React.useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coords = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    // console.log("Current Position (getCurrentPosition):", coords);                    
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


    const onLoad = React.useCallback((map) => (mapRef.current = map), []);

    return (
        <>
            <LoadScript
                googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                libraries={libraries}
            >
                <Box sx={{ position: "relative", height: "100vh" }}>
                    <GoogleMap
                        id="map"
                        ref={mapRef}
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                        onLoad={onLoad}
                    >
                        <PlacesAutoComplete mapRef={mapRef} />
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
                        <MarkerF position={MarkerPosition} />
                    </GoogleMap>
                </Box>
            </LoadScript>
        </>
    );
}

export default MapContainer;
