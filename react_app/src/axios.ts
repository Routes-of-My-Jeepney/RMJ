import axios from "axios";
import store from "./store";

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
    withCredentials: true,
    xsrfCookieName: "XSRF-TOKEN", // this is the name of the cookie where the csrf token is stored
    xsrfHeaderName: "X-XSRF-TOKEN", // this is the name of the http header that carries the csrf token
});

instance.interceptors.request.use((request) => {
    store.dispatch({ type: "setLoading", payload: true });
    return request;
});
// Add a response interceptor
instance.interceptors.response.use(
    (response) => {
        // Do something with response data
        store.dispatch({ type: "setLoading", payload: false });
        return response;
    },
    (error) => {
        // Do something with response error
        if (error.response) {
            store.dispatch({ type: "setLoading", payload: false });
            switch (error.response.status) {
                case 401:
                    localStorage.removeItem("user");
                    break;
                case 422:
                    // Handle the validation error here
                    // The exact implementation depends on your application
                    console.error("Validation error:", error.response.data);
                    break;
                default:
                    // Optionally handle other status codes
                    break;
            }
        }
        return Promise.reject(error);
    }
);
export default instance;
