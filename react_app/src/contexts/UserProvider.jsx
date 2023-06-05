import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import axios from "../axios";
import getCSRFToken from "../utils/getCSRFToken";
import { useNavigate } from "react-router-dom";

function UserProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(()=>{
        const localStorageData = localStorage.getItem('user');
        return localStorageData ? JSON.parse(localStorageData) : null;
    });
    const [isLoggedIn, setIsLoggedIn] = useState(user ? true : false);

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
            const userData = response.data.user;
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
            navigate("/");
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    const logout = async () => {
        try {
            await getCSRFToken();

            await axios.post(`/api/logout`);

            // for the sake of token based authentication
            // localStorage.removeItem("authToken");
            localStorage.removeItem("user");
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
            const userData = response.data.user;
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
        } catch (error) {
            // Handle error during registration
            if (error.response && error.response.status === 422) {
                console.error(error.response.data.errors);
            } else {
                console.error(error);
            }
        }
    };

    const deleteUser = async (userId) => {
        await getCSRFToken();
        axios
            .delete(`/api/users/${userId}`)
            .then((response) => {
                console.log(response.data);
                localStorage.removeItem("user");
                setUser(null);
            })
            .catch((error) => {
                // Something went wrong. Handle the error here.
                console.error(error);
            });
    };

    const getUser = async () => {
        await getCSRFToken();
        axios
            .get("/api/user") // Make sure this URL is correct
            .then((response) => {
                const userData = response.data;
                localStorage.setItem("user", JSON.stringify(userData));
                setUser(userData);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const value = {
        login,
        logout,
        register,
        deleteUser,
        getUser,
        isLoggedIn,
        user,
    };

    useEffect(() => {
        setIsLoggedIn(user !== null);
    }, [user]);

    // useEffect(
    //     () => async () => {
    //         await getCSRFToken();
    //         axios
    //             .get("/api/user") // Make sure this URL is correct
    //             .then((response) => {
    //                 setUser(response.data);
    //             })
    //             .catch((error) => {
    //                 console.error(error);
    //             });
    //     },
    //     []
    // );

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
}

export default UserProvider;
