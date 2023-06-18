export const useDrawRoute = ({ mapRef, state, dispatch, getUser }) => {
    if (originRef.current.value !== "" && destRef.current.value !== "") {
        try {
            var distanceMatrixservice = new google.maps.DistanceMatrixService();
            var map = mapRef.current;
            var infoWindow = new google.maps.InfoWindow(); // InfoWindowを作成
            var directionsRenderer = new google.maps.DirectionsRenderer({
                map: map,
                suppressMarkers: true,
            });
            var request = {
                origin: { placeId: originId },
                destination: { placeId: destinationId },
                travelMode: "DRIVING",
            };

            setLocation(request.origin.placeId, request.destination.placeId);
            function setLocation(originPlaceId, destinationPlaceId) {
                distanceMatrixservice.getDistanceMatrix(
                    {
                        origins: [{ placeId: originPlaceId }],
                        destinations: [{ placeId: destinationPlaceId }],
                        travelMode: request.travelMode,
                    },
                    timeRequired
                );
                var directionsService = new google.maps.DirectionsService();
                directionsService.route(request, function (result, status) {
                    if (status == "OK") {
                        directionsRenderer.setDirections(result);
                        var bounds = new google.maps.LatLngBounds();
                        var legs = result.routes[0].legs;
                        for (var i = 0; i < legs.length; i++) {
                            var steps = legs[i].steps;
                            for (var j = 0; j < steps.length; j++) {
                                var path = steps[j].path;
                                for (var k = 0; k < path.length; k++) {
                                    bounds.extend(path[k]);
                                }
                            }
                        }
                        map.fitBounds(bounds);
                        var distance = legs[0].distance.text;
                        var duration = legs[0].duration.text;
                        infoWindow.setContent(
                            "距離：" + distance + "<br>所要時間：" + duration
                        );
                        infoWindow.setPosition(
                            result.routes[0].overview_path[
                                Math.floor(
                                    result.routes[0].overview_path.length / 2
                                )
                            ]
                        );
                        infoWindow.open(map);
                        setShowObject(false);
                        setShowRoute(true);
                        setResearchRoute(true);
                    }
                });
            }
            getUser();
            postHistory();

            function timeRequired(response, status) {
                if (status == "OK") {
                    var origins = response.originAddresses;
                    var destinations = response.destinationAddresses;
                    for (var i = 0; i < origins.length; i++) {
                        var results = response.rows[i].elements;
                        for (var j = 0; j < results.length; j++) {
                            var element = results[j];
                            if (element.status === "OK") {
                                var distance = element.distance.text;
                                var duration = element.duration.text;
                                var from = origins[i];
                                var to = destinations[j];
                            } else {
                            }
                        }
                    }
                    {
                        infoWindow.open(map);
                    }
                } else {
                }
            }
        } catch {
            showAlert("入力された情報が読み取れませんでした。", "error");
        }
    } else {
        showAlert("出発地と目的地を入力してください。", "error");
    }
};
