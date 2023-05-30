import React, { useState } from "react";
import UserContext from "./UserContext";
import axios from "../axios";
import getCSRFToken from "../utils/getCSRFToken";
import { useNavigate } from "react-router-dom";

function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            await getCSRFToken();

            const response = await axios.post(`/api/login`, {
                email: email,
                password: password,
            });
            // for the sake of token based authentication
            // we need to store the token in the browser
            // localStorage.setItem("authToken", response.data.token);

            // for the sake of cookie based authentication
            // we need to store the cookie in the browser
            // and the browser will automatically send the cookie to the server
            // in the subsequent request
            setUser(response.data.user);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    const logout = async () => {
        try {
            await getCSRFToken();

            await axios.post(`/api/logout`);

            // for the sake of token based authentication
            // localStorage.removeItem("authToken");
            setUser(null);
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    const register = async (name, email, password, passwordConfirmation) => {
        try {
            await getCSRFToken();
            const response = await axios.post("/api/register", {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });
            setUser(response.data.user);
            console.log(response.data);
        } catch (error) {
            // Handle error during registration
            if (error.response && error.response.status === 422) {
                console.error(error.response.data.errors);
            } else {
                console.error(error);
            }
        }
    };

    const value = {
        user,
        login,
        logout,
        register,
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
}

export default UserProvider;
