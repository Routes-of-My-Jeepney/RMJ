import React, { useState, useEffect, FC } from "react";
import UserContext from "./UserContext";
import axios from "../axios";
import getCSRFToken from "../utils/getCSRFToken";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../components/CustomSnackbar";
import { UserContextType, User } from "../interfaces/UserContext";
import { ErrorResponse, UserPostResponse } from "../interfaces/Response";
import { isAxiosError, AxiosError } from "axios";
import { useSnackbarContext } from "./SnackbarContext";

const UserProvider: FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const navigate = useNavigate();
    //custum snack bar
    const [user, setUser] = useState<User | null>(() => {
        const localStorageData = localStorage.getItem("user");
        return localStorageData && localStorageData !== "undefined"
            ? JSON.parse(localStorageData)
            : null;
    });
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(user ? true : false);
    const { openSnackbar, snackbars } = useSnackbarContext();
    const refreshPage = () => {
        window.location.reload();
    };

    //login
    const login = async (email: string, password: string) => {
        await getCSRFToken();

        await axios
            .post<UserPostResponse>(`/api/login`, {
                email: email,
                password: password,
            })
            .then((response) => {
                const userData = response.data.user;
                localStorage.setItem("user", JSON.stringify(userData));
                setUser(userData);
                navigate("/");
                openSnackbar("ログインしました。", "success");
            })
            .catch((error) => {
                if (isAxiosError(error)) {
                    const serverError = error as AxiosError<ErrorResponse>;

                    if (serverError && serverError.response) {
                        const errorObject = serverError.response.data.errors; // Get the 'errors' object directly
                        if (errorObject) {
                            Object.entries(errorObject).forEach(
                                ([key, errorArray]) => {
                                    if (Array.isArray(errorArray)) {
                                        errorArray.forEach((error) => {
                                            openSnackbar(error, "error");
                                        });
                                    }
                                }
                            );
                        } else {
                            // throw new Error(serverError.response.data.message);
                            openSnackbar(
                                serverError.response.data.message,
                                "error"
                            );
                        }
                    }
                } else {
                    openSnackbar("ログインに失敗しました。", "error");
                }
            });
    };

    //logout

    const logout = async () => {
        try {
            await getCSRFToken();

            await axios.post("/api/user/logout");

            // for the sake of token based authentication
            // localStorage.removeItem("authToken");
            localStorage.removeItem("user");

            setUser(null);
            navigate("/login");
            openSnackbar("ログアウトしました。", "success");
        } catch (error) {
            openSnackbar("ログアウトに失敗しました。", "error");
            openSnackbar(error.message, "error");
        }
    };

    //register

    const register = async (
        name: string,
        email: string,
        password: string,
        passwordConfirmation: string
    ) => {
        await getCSRFToken();
        await axios
            .post<UserPostResponse>("/api/register", {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            })
            .then((response) => {
                const userData = response.data.user;
                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));
                console.log(response.data);
                navigate("/");
                openSnackbar("ユーザー情報を登録しました。", "success");
            })
            .catch((error) => {
                if (isAxiosError(error)) {
                    const serverError = error as AxiosError<ErrorResponse>;

                    if (serverError && serverError.response) {
                        const errorObject = serverError.response.data.errors; // Get the 'errors' object directly
                        if (errorObject) {
                            Object.entries(errorObject).forEach(
                                ([key, errorArray]) => {
                                    if (Array.isArray(errorArray)) {
                                        errorArray.forEach((error) => {
                                            openSnackbar(error, "error");
                                        });
                                    }
                                }
                            );
                        } else {
                            // throw new Error(serverError.response.data.message);
                            openSnackbar(
                                serverError.response.data.message,
                                "error"
                            );
                        }
                    }
                }
                // openSnackbar(error.message, "error");
            });
    };

    const deleteUser = async () => {
        if (user === null) {
            throw new Error("ユーザーが存在しません。");
        }
        await getCSRFToken();
        axios
            .delete(`/api/user/${user.id}`)
            .then((response) => {
                console.log(response.data);
                localStorage.removeItem("user");
                setUser(null);
                openSnackbar("ユーザーを削除しました。", "success");

                navigate("/");
                refreshPage();
            })
            .catch((error) => {
                openSnackbar("ユーザーの削除に失敗しました。", "error");
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
