import { useEffect } from "react";

export const useDirectionsService = ({
    mapRef,
    originId,
    destinationId,
    showRoute,
    showObject,
    setResearchRoute,
    infoWindow,
}) => {
    const renderer = new google.maps.DirectionsRenderer({
        map: mapRef.current,
        suppressMarkers: true,
    });

    return () => {
        const request = {
            origin: { placeId: originId },
            destination: { placeId: destinationId },
            travelMode: "DRIVING",
        };

        var directionsService = new google.maps.DirectionsService();

        directionsService.route(request, function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                renderer.setDirections(result);
                mapRef.current.fitBounds(result.routes[0].bounds);

                const leg = result.routes[0].legs[0];
                infoWindow.setContent(
                    `距離：${leg.distance.text} <br>所要時間：${leg.duration.text}`
                );
                infoWindow.setPosition(
                    leg.steps[leg.steps.length / 2].end_location
                );
                infoWindow.open(mapRef.current);

                setShowObject(false);
                showRoute(true);
                setResearchRoute(true);
            } else {
                console.error(`Directions request failed due to ${status}`);
            }
        });
    };
};

export function useGoogleAutocomplete(inputRef, dispatch, state, type) {
    const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current
    );

    autocomplete.addListener("place_changed", async function () {
        const place = await autocomplete.getPlace();

        if (type === "origin") {
            dispatch({
                type: "SET_ORIGIN",
                payload: {
                    ...state.origin,
                    placeId: place.place_id,
                    search: place.name,
                },
            });
        } else if (type === "destination") {
            dispatch({
                type: "SET_DESTINATION",
                payload: {
                    ...state.destination,
                    placeId: place.place_id,
                    search: place.name,
                },
            });
        }
    });
}
