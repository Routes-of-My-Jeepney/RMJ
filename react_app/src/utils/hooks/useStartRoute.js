export const useStartRoute = ({
    mapRef,
    setShowRoute,
    setResearchRoute,
    setFinishRoute,
    setCenter,
    setMarkerPosition,
    setIcon,
    state,
    setState,
}) => {
    const startRoute = () => {
        setShowRoute(false);
        setResearchRoute(false);
        setState({ type: "SET_LOADING", payload: true });
        const placeDestination = state.destination.place;
        if (navigator.geolocation) {
            let watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const coords = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        acr: position.coords.accuracy,
                        spd: position.coords.speed,
                    };
                    console.log("Current Position (WatchPosition):", coords);
                    setCenter(coords);
                    setMarkerPosition(coords);
                    setIcon(true);
                    mapRef.current.panTo(coords);
                    const distanceToDestination =
                        google.maps.geometry.spherical.computeDistanceBetween(
                            new google.maps.LatLng(coords.lat, coords.lng),
                            new google.maps.LatLng(
                                placeDestination.geometry.location
                            )
                        );
                    console.log(placeDestination);
                    console.log(distanceToDestination);
                    setState({ type: "SET_LOADING", payload: false });
                    if (distanceToDestination <= 100) {
                        setFinishRoute(true);
                    } else {
                        setResearchRoute(true);
                    }
                },
                (error) => {
                    setState({ type: "SET_LOADING", payload: false });
                    console.log("Geolocation error", error);
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 10000,
                }
            );
        } else {
            setState({ type: "SET_LOADING", payload: false });
            console.log("Geolocation is not supported by this browser.");
        }
    };
    return startRoute;
};
