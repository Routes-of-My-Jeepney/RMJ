import React, { useRef, useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import {
    Box,
    Stack,
    TextField,
    Slide,
    Button,
    Grid,
    Typography,
    Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CustomSnackbar from "../components/CustomSnackbar";
import { postHistory } from "../utils/axios";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

//import { makeStyles } from "@material-ui/core/styles";
// Styled Components for TextField and Map

const SearchBox = styled(Stack)({
    position: "absolute",
    left: "50%",
    top: "100px",
    zIndex: 100,
    transform: "translateX(-50%)",
});
const StyledStack = styled(Stack)({
    position: "absolute",
    left: "50%",
    top: "100px",
    zIndex: 100,
    transform: "translateX(-50%)",
});
const SwapButton = styled(ChangeCircleIcon)({
    color: "#2196f3",
    fontSize: "35px",
    position: "absolute",
    right: -35,
    top: 40,
    "&:hover": {
        color: "#64b5f6",
    },
    "&:active": {
        color: "#2196f3",
    },
});
const StyledTextField = styled(TextField)({
    backgroundColor: "#ffffff",
    width: "300px",
    borderRadius: "5px",
    position: "relative",
});
const RouteDrawButton = styled(Stack)({});
const RouteStartButton = styled(Stack)({
    position: "absolute",
    left: "50%",
    bottom: "100px",
    zIndex: 100,
    transform: "translateX(-50%)",
});
const RouteFinishAlert = styled(Stack)({
    position: "absolute",
    left: "50%",
    bottom: 0,
    zIndex: 100,
    width: "100vw",
    height: "20vh",
    transform: "translateX(-50%)",
})
const RouteFinishBox = styled(Stack)({
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    display: "flex", // 縦に要素を並べるために追加
    flexDirection: "column",
    justifyContent: "center", // 要素を中央揃えにするために追加
    alignItems: "center",
});

const refreshPage = () => {
    window.location.reload();
};
function PlacesAutoComplete({ mapRef, setIcon }) {
    // states
    const originRef = useRef();
    const destRef = useRef();
    const [originId, setOriginId] = useState(null);
    const [destinationId, setDestinationId] = useState(null);
    const [center, setCenter] = useState();
    const [MarkerPosition, setMarkerPosition] = React.useState();
    const [showObject, setShowObject] = useState(true);
    const [showRoute, setShowRoute] = useState(false);
    const [finishRoute, setFinishRoute] = useState(false);
    const [researchRoute, setResearchRoute] = useState(false);
    const [returnRoute, setReturnRoute] = useState(false);
    const [searchOrigin, setSearchOrigin] = useState("");
    const [searchDest, setSearchDest] = useState("");
    const [placeDestination, setPlaceDestination] = useState("");
    const [markerDesign, setMarkerDesign] = useState(null);
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        type: "",
        id: 0,
    });
    const showAlert = (message, type) => {
        setAlert({ open: true, message, type });
    };
    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlert({ ...alert, open: false });
    };

    const { isLoggedIn, getUser, user, setUser } = useContext(UserContext);

    //ルート入れ替え
    const swapButton = () => {
        const originValue = originRef.current.value;
        const destinationValue = destRef.current.value;

        setSearchOrigin(destinationValue);
        setSearchDest(originValue);
        setOriginId(destinationId);
        setDestinationId(originId);
    };

    // methods
    const drawRoute = () => {
        if (originRef.current.value !== "" && destRef.current.value !== "") {
            try {
                console.log(originRef.current.value);
                console.log(destRef.current.value);
                var distanceMatrixservice =
                    new google.maps.DistanceMatrixService();
                var map = mapRef.current;
                var infoWindow = new google.maps.InfoWindow(); // InfoWindowを作成
                var directionsRenderer = new google.maps.DirectionsRenderer({
                    map: map,
                    suppressMarkers: true,
                });
                var request = {
                    origin: { placeId: originId },
                    destination: { placeId: destinationId },
                    travelMode: "TRANSIT",
                };

                setLocation(
                    request.origin.placeId,
                    request.destination.placeId
                );
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
                                "距離：" +
                                distance +
                                "<br>所要時間：" +
                                duration
                            );
                            infoWindow.setPosition(
                                result.routes[0].overview_path[
                                Math.floor(
                                    result.routes[0].overview_path.length /
                                    2
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
    const clearRoute = (watchId) => {
        if (watchId) {
            navigator.geolocation.clearWatch(watchId);
        }
        setShowObject(true);
        setShowRoute(false);
        setFinishRoute(false);
        refreshPage();
    };
    const backToSearch = () => {
        setShowObject(true);
        setShowRoute(false);
        setResearchRoute(false);
        refreshPage();
    };

    const startRoute = () => {
        setShowRoute(false);
        setResearchRoute(false);
        if (navigator.geolocation) {
            let watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const coords = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        acr: position.coords.accuracy,
                        spd: position.coords.speed,
                    };
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
                    if (distanceToDestination <= 100) {
                        setReturnRoute(true);
                        setFinishRoute(true);
                    } else {
                        setResearchRoute(true);
                    }
                },
                (error) => {
                    console.log("Geolocation error", error);
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 10000,
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    };

    useEffect(() => {
        var options = {
            componentRestrictions: { country: "ph" },
        };

        var autoCompleteOrigin = new window.google.maps.places.Autocomplete(
            originRef.current,
            options
        );
        var autoCompleteDestination =
            new window.google.maps.places.Autocomplete(
                destRef.current,
                options
            );
        autoCompleteOrigin.addListener("place_changed", async function () {
            const place_origin = await autoCompleteOrigin.getPlace();
            setOriginId(place_origin.place_id);
            setSearchOrigin(place_origin.name);
        });
        autoCompleteDestination.addListener("place_changed", async function () {
            const place_destination = await autoCompleteDestination.getPlace();
            console.log(place_destination);
            setPlaceDestination(place_destination);
            setDestinationId(place_destination.place_id);
            setSearchDest(place_destination.name);
        });
    }, [searchOrigin, searchDest]);
    const handleOrigin = () => {
        setSearchOrigin(originRef.current.value);
    };
    const handleDest = () => {
        setSearchDest(destRef.current.value);
    };

    return (
        <>
            {showObject && (
                <SearchBox>
                    <Slide
                        direction="down"
                        in={showObject}
                        mountOnEnter
                        unmountOnExit
                    >
                        <Box>
                            <SwapButton
                                variant="swapButton"
                                onClick={swapButton}
                            >
                                BTN
                            </SwapButton>
                            <StyledTextField
                                id="origin-input"
                                label="出発地"
                                variant="outlined"
                                inputRef={originRef}
                                value={searchOrigin}
                                onChange={handleOrigin}
                            />
                            <br />
                            <StyledTextField
                                id="destination-input"
                                label="目的地"
                                variant="outlined"
                                inputRef={destRef}
                                value={searchDest}
                                onChange={handleDest}
                            />
                            <RouteDrawButton>
                                <Button variant="contained" onClick={drawRoute}>
                                    ルートを表示
                                </Button>
                            </RouteDrawButton>
                        </Box>
                    </Slide>
                </SearchBox>
            )}
            <RouteStartButton>
                <Grid container sx={{ display: "flex" }}>
                    {researchRoute && (
                        <Slide
                            direction="up"
                            in={researchRoute}
                            mountOnEnter
                            unmountOnExit
                        >
                            <Button
                                variant="outlined"
                                size="medium"
                                sx={{
                                    fontSize: "12px",
                                    backgroundColor: "white",
                                    margin: "0 5px",
                                }}
                                onClick={backToSearch}
                            >
                                再検索
                            </Button>
                        </Slide>
                    )}
                    {showRoute && (
                        <Slide
                            direction="up"
                            in={showRoute}
                            mountOnEnter
                            unmountOnExit
                        >
                            <Button
                                variant="contained"
                                size="medium"
                                sx={{ fontSize: "12px", margin: "0 5px" }}
                                onClick={startRoute}
                            >
                                ルート開始
                            </Button>
                        </Slide>
                    )}
                </Grid>
            </RouteStartButton>
            {finishRoute && (
                <RouteFinishAlert>
                    <Grid container sx={{ display: "flex" }}>
                        <Slide
                            direction="up"
                            in={finishRoute}
                            mountOnEnter
                            unmountOnExit
                        >
                            <RouteFinishBox>
                                <Typography
                                    variant="body1"
                                    sx={{ fontWeight: "bold", margin: "10px" }}
                                >
                                    目的地に到着しました
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{ margin: "10px", backgroundColor: "red" }}
                                    onClick={clearRoute}
                                >
                                    ルートを終了
                                </Button>
                            </RouteFinishBox>
                        </Slide>
                    </Grid>
                </RouteFinishAlert>
            )}
            <CustomSnackbar
                open={alert.open}
                handleClose={handleCloseAlert}
                message={alert.message}
                type={alert.type}
                id={0}
            />
        </>
    );
}
export default PlacesAutoComplete;
