import React, { useRef, useEffect, useState } from "react";
import { Box, Stack, TextField, Slide, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import CustomSnackbar from "./CustomSnackbar";

// Styled Components for TextField and Map
const StyledStack = styled(Stack)({
    position: "absolute",
    left: "50%",
    top: "100px",
    zIndex: 100,
    transform: "translateX(-50%)",
});

const StyledTextField = styled(TextField)({
    backgroundColor: "#ffffff",
    width: "300px",
    borderRadius: "5px",
});

const RouteDrawButton = styled(Stack)({});
const RouteStartButton = styled(Stack)({
    position: "absolute",
    left: "50%",
    bottom: "100px",
    zIndex: 100,
    transform: "translateX(-50%)",
});

function PlacesAutoComplete({ mapRef }) {
    const originRef = useRef();
    const destRef = useRef();
    const [originId, setoriginId] = useState(null);
    const [destinationId, setdestinationId] = useState(null);
    const [center, setCenter] = useState();
    const [MarkerPosition, setMarkerPosition] = React.useState();
    const [showObject, setShowObject] = useState(true);
    const [showRoute, setShowRoute] = useState(false);

    const drawRoute = () => {
        postHistory();
        var directionsService = new google.maps.DirectionsService();
        var directionsRenderer = new google.maps.DirectionsRenderer();
        var distanceMatrixservice = new google.maps.DistanceMatrixService();

        var map = mapRef.current;

        var infoWindow = new google.maps.InfoWindow(); // InfoWindowを作成
        var directionsRenderer = new google.maps.DirectionsRenderer({
            map: map,
        });
        // directionsRenderer.setDirections(null);
        var request = {
            origin: { placeId: originId },
            destination: { placeId: destinationId },
            travelMode: "DRIVING",
        };

        // ルート取得
        // setLocation(request.origin, request.destination);
        setLocation(request.origin.placeId, request.destination.placeId);

        function setLocation(originPlaceId, destinationPlaceId) {
            // 所要時間取得
            distanceMatrixservice.getDistanceMatrix(
                {
                    origins: [{ placeId: originPlaceId }], // 出発地
                    destinations: [{ placeId: destinationPlaceId }], // 目的地
                    travelMode: request.travelMode, // 移動手段
                },
                timeRequired
            );
            var directionsService = new google.maps.DirectionsService();
            directionsService.route(request, function (result, status) {
                if (status == "OK") {
                    console.log(result);
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

                    // 吹き出しの内容を更新
                    infoWindow.setContent(
                        "距離：" + distance + "<br>所要時間：" + duration
                    );
                    // ルートの中心座標に吹き出しを表示
                    infoWindow.setPosition(
                        result.routes[0].overview_path[
                            Math.floor(
                                result.routes[0].overview_path.length / 2
                            )
                        ]
                    );
                    // 吹き出しを開く
                    infoWindow.open(map);
                    setShowObject(false);
                    setShowRoute(true);
                }
            });
        }

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
                            // console.log("距離: " + distance);
                            // console.log("所要時間: " + duration);
                        } else {
                            // console.log("距離と所要時間の取得に失敗しました。");
                        }
                    }
                }
                {
                    infoWindow.open(map);
                }
            } else {
                // console.log("距離と所要時間の取得に失敗しました。ステータス: " + status);
            }
        }
        // };
    };
    const destinationLat = 10.3142109;
    const destinationLng = 123.9054164;
    const startRoute = () => {
        // startRoute関数の内容をここに記述
        if (navigator.geolocation) {
            var watchId = navigator.geolocation.watchPosition(
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
                    mapRef.current.panTo(coords);
                    const distanceToDestination =
                        google.maps.geometry.spherical.computeDistanceBetween(
                            new google.maps.LatLng(coords.lat, coords.lng),
                            new google.maps.LatLng(
                                destinationLat,
                                destinationLng
                            )
                        );

                    // 距離が一定の範囲内にあればナビゲーションを停止し、アラートを表示
                    const distanceThreshold = 100; // 単位: メートル
                    if (distanceToDestination <= distanceThreshold) {
                        navigator.geolocation.clearWatch(watchId); // ナビゲーションを停止
                        alert("目的地に到着しました！");
                    }
                },
                (error) => {
                    console.log("Geolocation error", error);
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 10000, // maximumAgeの値を設定（ミリ秒単位）
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }

        console.log("Hello");
        // startRouteが実行された後にshowRouteをtrueに設定
        setShowObject(false);
        setShowRoute(false);
    };

    useEffect(() => {
        var autoCompleteOrigin = new window.google.maps.places.Autocomplete(
            originRef.current
        );
        var autoCompleteDestination =
            new window.google.maps.places.Autocomplete(destRef.current);

        autoCompleteOrigin.addListener("place_changed", async function () {
            const place_origin = await autoCompleteOrigin.getPlace();
            setoriginId(place_origin.place_id);
        });

        autoCompleteDestination.addListener("place_changed", async function () {
            const place_destination = await autoCompleteDestination.getPlace();
            setdestinationId(place_destination.place_id);
        });
    }, []);

    //検索窓に入力された値を履歴用にuseRefで保存する

    const url = "http://localhost:8000/api/";
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    async function postHistory() {
        try {
            const res = await axios.post(url + "history", {
                user_id: 1,
                origin: originRef.current.value,
                destination: destRef.current.value,
            });
            console.log("よし");
        } catch (e) {
            console.log(e);
            console.log("エラーが起きました！");
            setSnackbarOpen(true);
            setSnackbarMessage("出発地、または目的地を入力してください。");
            return;
        }
    }

    return (
        <>
            {showObject && (
                <StyledStack>
                    <Slide
                        direction="down"
                        in={showObject}
                        mountOnEnter
                        unmountOnExit
                    >
                        <Box>
                            <StyledTextField
                                id="origin-input"
                                label="出発地"
                                variant="outlined"
                                inputRef={originRef}
                            />
                            <br />
                            <StyledTextField
                                id="destination-input"
                                label="目的地"
                                variant="outlined"
                                inputRef={destRef}
                            />
                            <RouteDrawButton>
                                <Button variant="contained" onClick={drawRoute}>
                                    ルートを表示
                                </Button>
                            </RouteDrawButton>
                            <CustomSnackbar
                                open={snackbarOpen}
                                handleClose={() => setSnackbarOpen(false)}
                                message={snackbarMessage}
                                type={"error"}
                            />
                        </Box>
                    </Slide>
                </StyledStack>
            )}

            {showRoute && (
                <RouteStartButton>
                    <Slide
                        direction="up"
                        in={showRoute}
                        mountOnEnter
                        unmountOnExit
                    >
                        <Button variant="contained" onClick={startRoute}>
                            ルートを開始
                        </Button>
                    </Slide>
                </RouteStartButton>
            )}
        </>
    );
}

export default PlacesAutoComplete;
