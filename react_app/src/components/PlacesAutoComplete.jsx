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
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { styled } from "@mui/material/styles";
import CustomDropdown from "./CustomDropdown";
import getCSRFToken from "../utils/getCSRFToken";
import axios from "../axios";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { useSnackbarContext } from "../contexts/SnackbarContext";

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

const refreshPage = () => {
    window.location.reload();
};

const initialState = {
    origin: {
        place: null,
        search: "",
        placeId: null,
        histories: [],
        showCustomDropdown: false,
    },
    destination: {
        place: null,
        search: "",
        placeId: null,
        histories: [],
        showCustomDropdown: false,
    },
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_ORIGIN":
            return { ...state, origin: action.payload };
        case "SET_DESTINATION":
            return { ...state, destination: action.payload };
        case "SET_ORIGIN_SEARCH":
            return {
                ...state,
                origin: { ...state.origin, search: action.payload },
            };
        case "SET_DESTINATION_SEARCH":
            return {
                ...state,
                destination: { ...state.destination, search: action.payload },
            };
        case "SET_ORIGIN_HISTORY":
            return {
                ...state,
                origin: { ...state.origin, histories: action.payload },
            };
        case "SET_DESTINATION_HISTORY":
            return {
                ...state,
                destination: {
                    ...state.destination,
                    histories: action.payload,
                },
            };
        case "SET_ORIGIN_TOGGLE_CUSTOM_DROPDOWN":
            return {
                ...state,
                origin: { ...state.origin, showCustomDropdown: action.payload },
            };
        case "SET_DESTINATION_TOGGLE_CUSTOM_DROPDOWN":
            return {
                ...state,
                destination: {
                    ...state.destination,
                    showCustomDropdown: action.payload,
                },
            };
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
    const { openSnackbar } = useSnackbarContext();

    //ルート入れ替え
    const handleSwapPlaces = () => {
        if (state.origin.place && state.destination.place) {
            dispatch({
                type: "SET_ORIGIN",
                payload: {
                    place: state.destination.place,
                    placeId: state.destination.placeId,
                    search: destRef.current.value,
                },
            });

            dispatch({
                type: "SET_DESTINATION",
                payload: {
                    place: state.origin.place,
                    placeId: state.origin.placeId,
                    search: originRef.current.value,
                },
            });
            console.log(state);
        } else {
            openSnackbar("Enter both origin and destination", "error");
        }
    };

    // methods
    const drawRoute = useDrawRoute({
        mapRef,
        state,
        setShowRoute,
        setShowSearchBar,
        setResearchRoute,
    });

    const startRoute = useStartRoute({
        mapRef,
        setShowRoute,
        setResearchRoute,
        setFinishRoute,
        setCenter,
        setMarkerPosition,
        setIcon,
        state,
    });

    const clearRoute = (watchId) => {
        if (watchId) {
            navigator.geolocation.clearWatch(watchId);
        }
        setShowRoute(false);
        setFinishRoute(false);
        refreshPage();
    };
    const backToSearch = () => {
        setShowRoute(false);
        setResearchRoute(false);
        refreshPage();
    };

    // Create an async function that fetches and dispatches history data
    const fetchAndDispatchHistory = async (type) => {
        getCSRFToken();
        try {
            const { data: data } = await axios.get("/api/user/history");

            let places;
            if (type === "SET_ORIGIN_HISTORY") {
                places = data.map(({ origin }) => origin);
            } else if (type === "SET_DESTINATION_HISTORY") {
                places = data.map(({ destination }) => destination);
            }
            // Default case

            dispatch({ type: type, payload: places });
        } catch (err) {
            openSnackbar(err.message, "error");
        }
    };
    // Use the function in your focus handlers
    const createHandleFocus = (ref, type, dropdown) => () => {
        if (!ref.current.value) {
            fetchAndDispatchHistory(type);
            dispatch({ type: dropdown, payload: true });
        }
    };

    const handleOriginFocus = createHandleFocus(
        originRef,
        "SET_ORIGIN_HISTORY",
        "SET_ORIGIN_TOGGLE_CUSTOM_DROPDOWN"
    );
    const handleDestinationFocus = createHandleFocus(
        destRef,
        "SET_DESTINATION_HISTORY",
        "SET_DESTINATION_TOGGLE_CUSTOM_DROPDOWN"
    );

    // const createHandleInput = (type) => () => {
    //     // Hide history data when user starts typing
    //     dispatch({
    //         type: type,
    //         payload: {
    //             histories: [],
    //         },
    //     });
    // };

    // const handleOriginInput = createHandleInput("SET_ORIGIN_SEARCH");
    // const handleDestinationInput = createHandleInput("SET_DESTINATION_SEARCH");

    const createHandleSelect = (type, closer, ref) => (value) => {
        dispatch({
            type: type,
            payload: value,
        });
        dispatch({ type: closer, payload: false });
        ref.current.value = value;
    };

    const handleOriginSelect = createHandleSelect(
        "SET_ORIGIN_SEARCH",
        "SET_ORIGIN_TOGGLE_CUSTOM_DROPDOWN",
        originRef
    );
    const handleDestinationSelect = createHandleSelect(
        "SET_DESTINATION_SEARCH",
        "SET_DESTINATION_TOGGLE_CUSTOM_DROPDOWN",
        destRef
    );

    const handleClickAway = (ACTION) => {
        dispatch({ type: ACTION, payload: false });
    };

    useEffect(() => {
        useGoogleAutocomplete(originRef, dispatch, state, "origin");
        useGoogleAutocomplete(destRef, dispatch, state, "destination");
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
                            <SwapButton
                                variant="swapButton"
                                onClick={handleSwapPlaces}
                            >
                                BTN
                            </SwapButton>
                            <ClickAwayListener
                                onClickAway={() => {
                                    handleClickAway(
                                        "SET_ORIGIN_TOGGLE_CUSTOM_DROPDOWN"
                                    );
                                }}
                            >
                                <Box>
                                    <TextField
                                        className="styled-text-field"
                                        id="origin-input"
                                        label="出発地"
                                        variant="outlined"
                                        inputRef={originRef}
                                        value={state.origin.search}
                                        onFocus={handleOriginFocus}
                                        // onInput={handleOriginInput}
                                        onChange={(e) => {
                                            dispatch({
                                                type: "SET_ORIGIN",
                                                payload: {
                                                    ...state.origin,
                                                    search: e.target.value,
                                                },
                                            });
                                            dispatch({
                                                type: "SET_ORIGIN_TOGGLE_CUSTOM_DROPDOWN",
                                                payload: false,
                                            });
                                        }}
                                    />
                                    <br />
                                    {state.origin.histories &&
                                        state.origin.histories.length > 0 && (
                                            <CustomDropdown
                                                anchorEl={originRef.current}
                                                options={state.origin.histories}
                                                open={
                                                    state.origin
                                                        .showCustomDropdown
                                                }
                                                handleSelect={
                                                    handleOriginSelect
                                                }
                                                dispatch={dispatch}
                                                ACTION="SET_ORIGIN_TOGGLE_CUSTOM_DROPDOWN"
                                            />
                                        )}
                                </Box>
                            </ClickAwayListener>
                            <ClickAwayListener
                                onClickAway={() => {
                                    handleClickAway(
                                        "SET_DESTINATION_TOGGLE_CUSTOM_DROPDOWN"
                                    );
                                }}
                            >
                                <Box>
                                    <TextField
                                        className="styled-text-field"
                                        id="destination-input"
                                        label="目的地"
                                        variant="outlined"
                                        inputRef={destRef}
                                        value={state.destination.search}
                                        onFocus={handleDestinationFocus}
                                        // onInput={handleDestinationInput}
                                        onChange={(e) => {
                                            dispatch({
                                                type: "SET_DESTINATION",
                                                payload: {
                                                    ...state.destination,
                                                    search: e.target.value,
                                                },
                                            });
                                            dispatch({
                                                type: "SET_DESTINATION_TOGGLE_CUSTOM_DROPDOWN",
                                                payload: false,
                                            });
                                        }}
                                    />
                                    {state.destination.histories &&
                                        state.destination.histories.length >
                                            0 && (
                                            <CustomDropdown
                                                anchorEl={destRef.current}
                                                options={
                                                    state.destination.histories
                                                }
                                                open={
                                                    state.destination
                                                        .showCustomDropdown
                                                }
                                                handleSelect={
                                                    handleDestinationSelect
                                                }
                                                dispatch={dispatch}
                                                ACTION="SET_DESTINATION_TOGGLE_CUSTOM_DROPDOWN"
                                            />
                                        )}
                                </Box>
                            </ClickAwayListener>
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
            {finishRoute && (
                <Stack className="route-finish-alert">
                    <Grid container sx={{ display: "flex" }}>
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
                    </Grid>
                </Stack>
            )}
        </>
    );
}
export default PlacesAutoComplete;
