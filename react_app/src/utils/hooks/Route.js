export function Route({ origin, destination, map }) {
    const [directionsRenderer, setDirectionsRenderer] = useState(null);

    useEffect(() => {
        if (origin && destination) {
            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer({
                map,
            });
            setDirectionsRenderer(directionsRenderer);

            const request = {
                origin: { placeId: origin.placeId },
                destination: { placeId: destination.placeId },
                travelMode: "TRANSIT",
            };

            directionsService.route(request, function (result, status) {
                if (status === "OK") {
                    directionsRenderer.setDirections(result);
                }
            });
        }
    }, [origin, destination, map]);

    // When origin or destination changes, clear existing directions
    useEffect(() => {
        if (directionsRenderer) {
            directionsRenderer.setDirections(null);
        }
    }, [origin, destination, directionsRenderer]);

    // Don't need to render anything in this component,
    // it just handles the side-effect of drawing the route
    return null;
}
