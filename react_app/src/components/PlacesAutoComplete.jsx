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
import CustomSnackbar from "../components/CustomSnackbar";
import { postHistory } from "../utils/axios";
import "../styles/MapPage.scss";
import { useGoogleAutocomplete } from "../utils/hooks/GoogleMapApi";
import { useDrawRoute } from "../utils/hooks/useDrawRoute";
import { useStartRoute } from "../utils/hooks/useStartRoute";

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

function PlacesAutoComplete({ mapRef, setIcon, setCenter, setMarkerPosition }) {
    // states
    const [state, dispatch] = useReducer(reducer, initialState);
    const originRef = useRef();
    const destRef = useRef();
    const [showSearchBar, setShowSearchBar] = useState(true);
    const [showRoute, setShowRoute] = useState(false);
    const [finishRoute, setFinishRoute] = useState(false);
    const [researchRoute, setResearchRoute] = useState(false);

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
    const drawRoute = useDrawRoute({
        mapRef,
        state,
        setShowRoute,
        setShowSearchBar,
    });

    const startRoute = useStartRoute({
        mapRef,
        setShowRoute,
        setResearchRoute,
        setFinishRoute,
        setCenter,
        setMarkerPosition,
        setIcon,
    });

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

    useEffect(() => {
        useGoogleAutocomplete(originRef, dispatch, "origin");
        useGoogleAutocomplete(destRef, dispatch, "destination");
    }, [state.origin, state.destination]);

    return (
        <>
            {showSearchBar && (
                <Stack className="search-box">
                    <Slide
                        direction="down"
                        in={showSearchBar}
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
                                    dispatch({
                                        type: "SET_ORIGIN",
                                        payload: {
                                            search: state.origin.search,
                                        },
                                    });
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
                                    dispatch({
                                        type: "SET_DESTINATION",
                                        payload: {
                                            search: state.destination.search,
                                        },
                                    });
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
