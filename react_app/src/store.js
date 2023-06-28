import { createStore } from "redux";

const initialState = {
    loading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
};

const store = createStore(reducer);

export default store;
