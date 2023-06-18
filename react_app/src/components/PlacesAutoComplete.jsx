import React, {
    useRef,
    useEffect,
    useState,
    useContext,
    useReducer,
} from "react";
import UserContext from "../contexts/UserContext";
import {
    Box,
    Stack,
    TextField,
    Slide,
    Button,
    Grid,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CustomSnackbar from "../components/CustomSnackbar";
import { postHistory } from "../utils/axios";
import "../styles/MapPage.scss";
import { useGoogleAutocomplete } from "../utils/hooks/GoogleMapApi";
import { useDrawRoute } from "../utils/hooks/useDrawRoute";

const refreshPage = () => {
    window.location.reload();
};

const initialState = {
    origin: { search: null, placeId: null },
    destination: { search: null, placeId: null },
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_ORIGIN":
            return { ...state, origin: action.payload };
        case "SET_DESTINATION":
            return { ...state, destination: action.payload };
        default:
            throw new Error();
    }
};

function PlacesAutoComplete({ mapRef, setIcon }) {
    // states
    const [state, dispatch] = useReducer(reducer, initialState);
    const originRef = useRef();
    const destRef = useRef();
    const [center, setCenter] = useState();
    const [MarkerPosition, setMarkerPosition] = React.useState();
    const [showObject, setShowObject] = useState(true);
    const [showRoute, setShowRoute] = useState(false);
    const [finishRoute, setFinishRoute] = useState(false);
    const [researchRoute, setResearchRoute] = useState(false);
    const [returnRoute, setReturnRoute] = useState(false);
    const [placeDestination, setPlaceDestination] = useState("");
    const [markerDesign, setMarkerDesign] = useState(null);

    const setOriginId = (id) => {
        dispatch({
            type: "SET_ORIGIN",
            payload: { ...state.origin, placeId: id },
        });
    };

    const setOriginSearch = (search) => {
        console.log("search: ", search);
        dispatch({
            type: "SET_ORIGIN",
            payload: { ...state.origin, search: search },
        });
    };

    const setDestinationId = (id) => {
        dispatch({
            type: "SET_DESTINATION",
            payload: { ...state.destination, placeId: id },
        });
    };

    const setDestinationSearch = (search) => {
        dispatch({
            type: "SET_DESTINATION",
            payload: { ...state.destination, search: search },
        });
    };

    useGoogleAutocomplete(originRef, setOriginSearch, setOriginId);
    useGoogleAutocomplete(destRef, setDestinationSearch, setDestinationId);

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

    // methods
    const drawRoute = useDrawRoute({ mapRef, state, dispatch });

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

    return (
        <>
            {showObject && (
                <Stack className="search-box">
                    <Slide
                        direction="down"
                        in={showObject}
                        mountOnEnter
                        unmountOnExit
                    >
                        <Box>
                            <TextField
                                className="styled-text-field"
                                id="origin-input"
                                label="出発地"
                                variant="outlined"
                                inputRef={originRef}
                                value={state.origin.search}
                                onChange={() => {
                                    setOriginSearch(state.origin.search);
                                }}
                            />
                            <br />
                            <TextField
                                className="styled-text-field"
                                id="destination-input"
                                label="目的地"
                                variant="outlined"
                                inputRef={destRef}
                                value={state.destination.search}
                                onChange={() => {
                                    setDestinationSearch(
                                        state.destination.search
                                    );
                                }}
                            />
                            <Stack>
                                <Button variant="contained" onClick={drawRoute}>
                                    ルートを表示
                                </Button>
                            </Stack>
                        </Box>
                    </Slide>
                </Stack>
            )}
            <Stack className="route-start-button">
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
            </Stack>
            <Box>
                {finishRoute && (
                    <Slide
                        direction="up"
                        in={finishRoute}
                        mountOnEnter
                        unmountOnExit
                    >
                        <Stack className="route-finish-box">
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
                        </Stack>
                    </Slide>
                )}
            </Box>
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
