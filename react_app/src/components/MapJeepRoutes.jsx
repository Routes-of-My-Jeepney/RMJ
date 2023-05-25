import React, { useState, useEffect } from "react";
import {
    GoogleMap,
    LoadScript,
    DirectionsService,
    DirectionsRenderer,
} from "@react-google-maps/api";

function MapJeepRoutes({ selectedJeepney }) {
    const [origin, setOrigin] = useState({ lat: null, lng: null });
    const [destination, setDestination] = useState({ lat: null, lng: null });
    const [directions, setDirections] = useState(null);

    // Fetch jeepney data when selectedJeepney changes
    // useEffect(() => {
    //     fetch(
    //         `${
    //             import.meta.env.VITE_API_BASE_URL
    //         }/api/jeepneys/${selectedJeepney}`
    //     )
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setOrigin(data.origin);
    //             setDestination(data.destination);
    //         });
    // }, [selectedJeepney]);
    useEffect(() => {
        if (selectedJeepney) {
            setOrigin({
                lat: parseFloat(selectedJeepney.originlat),
                lng: parseFloat(selectedJeepney.originlng),
            });
            setDestination({
                lat: parseFloat(selectedJeepney.destinationlat),
                lng: parseFloat(selectedJeepney.destinationlng),
            });
        }
    }, [selectedJeepney]);

    // Calculate directions when origin or destination changes
    useEffect(() => {
        if (origin.lat && destination.lat) {
            const DirectionsService = new google.maps.DirectionsService();

            DirectionsService.route(
                {
                    origin: origin,
                    destination: destination,
                    travelMode: google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        setDirections(result);
                    } else {
                        console.error(`Error fetching directions ${result}`);
                    }
                }
            );
        }
    }, [origin, destination]);

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                id="jeepney-route-map"
                mapContainerStyle={{
                    height: "100%",
                    width: "100%",
                }}
                zoom={8}
                center={{
                    lat: 10.3157,
                    lng: 123.8854, // These are coordinates for Cebu. Adjust as needed.
                }}
            >
                {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
        </LoadScript>
    );
}

export default MapJeepRoutes;
