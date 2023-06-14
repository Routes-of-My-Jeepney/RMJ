import React, { useState, useEffect, FC } from "react";
import UserContext from "./UserContext";
import axios from "../axios";
import getCSRFToken from "../utils/getCSRFToken";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../components/CustomSnackbar";
import { UserContextType, User } from "../interfaces/UserContext";
import { ErrorResponse, UserPostResponse } from "../interfaces/Response";
import { isAxiosError, AxiosError } from "axios";

const UserProvider: FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const navigate = useNavigate();
    //custum snack bar
    const [user, setUser] = useState<User | null>(() => {
        const localStorageData = localStorage.getItem("user");
        return localStorageData ? JSON.parse(localStorageData) : null;
    });
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(user ? true : false);
    const refreshPage = () => {
        window.location.reload();
    };

    //login
    const login = async (email: string, password: string) => {
        try {
            await getCSRFToken();

            const response = await axios.post<UserPostResponse>(`/api/login`, {
                email: email,
                password: password,
            });

            const userData = response.data.user;
            setUser(userData);

            localStorage.setItem("user", JSON.stringify(userData));
            return "ログインに成功しました。";
        } catch (error) {
            if (isAxiosError(error)) {
                const serverError = error as AxiosError<ErrorResponse>;
                if (serverError && serverError.response) {
                    throw new Error(serverError.response.data.message);
                }
            }
            throw new Error("ログインに失敗しました。");
        }
    };

    //logout
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
            localStorage.removeItem("user");

            successLogoutDisp();

            setUser(null);
            navigate("/login");
            refreshPage();
        } catch (error) {
            console.error(error);
            failureLogoutDisp();
        }
    };

    //register
    //register
    const register = async (
        name: string,
        email: string,
        password: string,
        passwordConfirmation: string
    ) => {
        if (
            name !== "" &&
            email !== "" &&
            password !== "" &&
            passwordConfirmation !== ""
        ) {
            try {
                await getCSRFToken();
                const response = await axios.post<UserPostResponse>(
                    "/api/register",
                    {
                        name,
                        email,
                        password,
                        password_confirmation: passwordConfirmation,
                    }
                );
                const userData = response.data.user;
                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));
                return "アカウントの作成に成功しました";
            } catch (error) {
                if (isAxiosError(error)) {
                    const serverError = error as AxiosError<ErrorResponse>;
                    if (serverError && serverError.response) {
                        throw new Error(serverError.response.data.message);
                    }
                }
                throw new Error("必要な情報を入力してください。"); // default error message
            }
        } else {
            throw new Error("All fields must be filled."); // this will be your message for when not all fields are filled
        }
    };

    //Delete
    function successDeleteDisp() {
        window.alert("アカウントの削除に成功しました。");
    }
    function failureDeleteDisp() {
        window.alert("アカウントの削除に失敗しました。");
    }
    const deleteUser = async () => {
        if (user === null) {
            throw new Error("ユーザーが存在しません。");
        }
        await getCSRFToken();
        axios
            .delete(`/api/users/${user.id}`)
            .then((response) => {
                console.log(response.data);
                localStorage.removeItem("user");
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
                const userData = response.data;
                localStorage.setItem("user", JSON.stringify(userData));
                setUser(userData);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const value: UserContextType = {
        login,
        logout,
        register,
        deleteUser,
        getUser,
        isLoggedIn,
        user,
        setUser,
    };

    useEffect(() => {
        setIsLoggedIn(user !== null);
    }, [user]);

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

export default UserProvider;
