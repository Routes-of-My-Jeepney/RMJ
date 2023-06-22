import { useRef } from "react";

export const useDrawRoute = ({
    mapRef,
    state,
    setShowRoute,
    setShowSearchBar,
    setResearchRoute,
}) => {
    const directionsRendererRef = useRef();
    const drawRoute = () => {
        if (state.origin.placeId && state.destination.placeId) {
            try {
                const map = mapRef.current;
                const directionsService = new google.maps.DirectionsService();
                const infoWindow = new google.maps.InfoWindow();
                const directionsRenderer = new google.maps.DirectionsRenderer({
                    map: map,
                    suppressMarkers: true,
                });
                var request = {
                    origin: { placeId: state.origin.placeId },
                    destination: { placeId: state.destination.placeId },
                    travelMode: "TRANSIT",
                };

                if (directionsRendererRef.current) {
                    directionsRendererRef.current.setMap(null);
                }
                directionsService.route(request, function (result, status) {
                    if (status == "OK") {
                        directionsRenderer.setDirections(result);
                        var bounds = new google.maps.LatLngBounds();
                        directionsRendererRef.current = directionsRenderer;

                        const { distance, duration } = result.routes[0].legs[0];
                        const steps = result.routes[0].legs[0].steps;
                        steps.forEach((step, index) => {
                            console.log(
                                `Step ${index + 1}: ${step.instructions}`
                            );
                            console.log(`Distance: ${step.distance.text}`);
                            console.log(`Duration: ${step.duration.text}`);
                            console.log("-------------------------");
                        });

                        infoWindow.setContent(
                            "距離：" +
                                distance.text +
                                "<br>所要時間：" +
                                duration.text +
                                "<br><a href='https://www.google.com/maps/dir/?api=1&origin="
                            // originRef.current.value +
                            // "&destination=" +
                            // destRef.current.value +
                            // "&travelmode=transit' target='_blank'>Googleマップで見る</a>"
                        );
                        infoWindow.setPosition(
                            result.routes[0].legs[0].end_location
                        );

                        // for (var i = 0; i < legs.length; i++) {
                        //     var steps = legs[i].steps;
                        //     for (var j = 0; j < steps.length; j++) {
                        //         var path = steps[j].path;
                        //         for (var k = 0; k < path.length; k++) {
                        //             bounds.extend(path[k]);
                        //         }
                        //     }
                        // }
                        // map.fitBounds(bounds);

                        // infoWindow.setPosition(
                        //     result.routes[0].overview_path[
                        //         Math.floor(
                        //             result.routes[0].overview_path.length / 2
                        //         )
                        //     ]
                        // );

                        infoWindow.open(map);
                        setShowSearchBar(false);
                        setShowRoute(true);
                        setResearchRoute(true);
                    }
                });
                // postHistory();
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("出発地と目的地を入力してください。", "error");
        }
    };
    return drawRoute;
};
