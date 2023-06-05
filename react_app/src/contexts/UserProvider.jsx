import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import axios from "../axios";
import getCSRFToken from "../utils/getCSRFToken";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../components/CustomSnackbar";

function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    // function SuccessLoginDisp() {
    //     // window.alert("ログインに成功しました。");

    // }

    //custum snack bar
    const [SnackbarOpen, setSnackbarOpen] = useState(false);
    const [SnackbarMessage, setSuccessSnackbarMessage] = useState("");
    const [status, setStatus] = useState();
    const [message, setMessage] = useState("");

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
            localStorage.setItem("user", JSON.stringify(response.data.user));

            //SuccessLoginDisp();
            //navigate("/");
            return "ログインに成功しました。";
        } catch (error) {
            return error.response.data;
        }
    };
    function successLogoutDisp() {
        window.alert("ログアウトに成功しました。");
    }
    function failureLogoutDisp() {
        window.alert("ログアウトに失敗しました。");
    }
    const logout = async () => {
        try {
            await getCSRFToken();

            await axios.post(`/api/logout`);

            // for the sake of token based authentication
            // localStorage.removeItem("authToken");
            setUser(null);
            localStorage.removeItem("user");
            successLogoutDisp();
            navigate("/login");
        } catch (error) {
            console.error(error);
            failureLogoutDisp();
        }
    };

    const register = async (name, email, password, passwordConfirmation) => {
        if (
            name !== "" &&
            email !== "" &&
            password !== "" &&
            passwordConfirmation !== ""
        ) {
            try {
                await getCSRFToken();
                const response = await axios.post("/api/register", {
                    name,
                    email,
                    password,
                    password_confirmation: passwordConfirmation,
                });
                setUser(response.data.user);
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
                console.log(response.data);
            } catch (error) {
                // Handle error during registration
                if (error.response && error.response.status === 422) {
                    console.error(error.response.data.errors);
                } else {
                    console.error(error);
                }
            }
        } else {
            console.error("こちら");
        }
    };

    function successDeleteDisp() {
        window.alert("アカウントの削除に成功しました。");
    }
    function failureDeleteDisp() {
        window.alert("アカウントの削除に失敗しました。");
    }
    const deleteUser = async (userId) => {
        await getCSRFToken();
        axios
            .delete(`/api/users/${userId}`)
            .then((response) => {
                console.log(response.data);
                setUser(null);
                successDeleteDisp;
            })
            .catch((error) => {
                // Something went wrong. Handle the error here.
                console.error(error);
                failureDeleteDisp();
            });
    };

    const getUser = async () => {
        await getCSRFToken();
        axios
            .get("/api/user") // Make sure this URL is correct
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const value = {
        user,
        login,
        logout,
        register,
        deleteUser,
        getUser,
    };

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
