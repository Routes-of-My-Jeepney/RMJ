export const useDrawRoute = ({ mapRef, state }) => {
    if (state.origin.placeId && state.destination.placeId) {
        try {
            var map = mapRef.current;
            var directionsService = new google.maps.DirectionsService();
            var infoWindow = new google.maps.InfoWindow();
            var directionsRenderer = new google.maps.DirectionsRenderer({
                map: map,
                suppressMarkers: true,
            });
            var request = {
                origin: { placeId: state.origin.placeId },
                destination: { placeId: state.destination.placeId },
                travelMode: "TRANSIT",
            };

            directionsService.route(request, function (result, status) {
                if (status == "OK") {
                    directionsRenderer.setDirections(result);
                    var bounds = new google.maps.LatLngBounds();

                    const { distance, duration } = result.routes[0].legs[0];

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
                    // setShowObject(false);
                    // setShowRoute(true);
                    // setResearchRoute(true);
                }
            });
            // postHistory();

            // function timeRequired(response, status) {
            //     if (status == "OK") {
            //         var origins = response.originAddresses;
            //         var destinations = response.destinationAddresses;
            //         for (var i = 0; i < origins.length; i++) {
            //             var results = response.rows[i].elements;
            //             for (var j = 0; j < results.length; j++) {
            //                 var element = results[j];
            //                 if (element.status === "OK") {
            //                     var distance = element.distance.text;
            //                     var duration = element.duration.text;
            //                     var from = origins[i];
            //                     var to = destinations[j];
            //                 } else {
            //                 }
            //             }
            //         }
            //         {
            //             infoWindow.open(map);
            //         }
            //     } else {
            //         window.alert("Directions request failed due to " + status);
            //     }
            // }
        } catch {
            // showAlert("入力された情報が読み取れませんでした。", "error");
        }
    } else {
        // showAlert("出発地と目的地を入力してください。", "error");
    }
};
