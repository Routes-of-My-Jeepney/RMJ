import axios from "axios";

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
    withCredentials: true,
    xsrfCookieName: "XSRF-TOKEN", // this is the name of the cookie where the csrf token is stored
    xsrfHeaderName: "X-XSRF-TOKEN", // this is the name of the http header that carries the csrf token
});

// Add a response interceptor
instance.interceptors.response.use(
    (response) => {
        // Do something with response data
        return response;
    },
    (error) => {
        // Do something with response error
        if (error.response) {
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
