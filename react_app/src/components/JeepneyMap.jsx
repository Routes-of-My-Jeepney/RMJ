import React, { useState, useEffect } from "react";
import {
    GoogleMap,
    DirectionsService,
    DirectionsRenderer,
} from "@react-google-maps/api";
import { useJeepneyContext } from "../contexts/JeepneyContext";

function JeepneyMap({ setDrawerOpen }) {
    const [origin, setOrigin] = useState({ lat: null, lng: null });
    const [destination, setDestination] = useState({ lat: null, lng: null });
    const [directions, setDirections] = useState(null);
    const { selectedJeepney } = useJeepneyContext();

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
                        setDrawerOpen(false);
                    } else {
                        console.error(`Error fetching directions ${result}`);
                    }
                }
            );
        }
    }, [origin, destination]);

    return (
        <GoogleMap
            id="jeepney-route-map"
            mapContainerStyle={{
                height: "100%",
                width: "100%",
            }}
            zoom={15}
            center={{
                lat: 10.3157,
                lng: 123.8854, // These are coordinates for Cebu. Adjust as needed.
            }}
            region="PH"
        >
            {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
    );
}

export default JeepneyMap;
