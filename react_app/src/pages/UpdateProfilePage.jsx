import { TextField, Button, Box, Grid, Paper, Typography } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import axios from "../axios";
import UserContext from "../contexts/UserContext";
import getCSRFToken from "../utils/getCSRFToken";
import CustomSnackbar from "../components/CustomSnackbar";
import { useNavigate } from "react-router-dom";
// import { set } from "lodash";

const UpdateProfilePage = () => {
    const [profileImg, setProfileImg] = useState(null);
    const { isLoggedIn, getUser } = useContext(UserContext);
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    const [alert, setAlert] = useState({
        open: false,
        message: "",
        type: "",
        id: 0,
    });

    const [alert1, setAlert1] = useState({
        open: false,
        message: "",
        type: "",
        id: 1,
    });

    const showAlert = (message, type) => {
        setAlert({ open: true, message, type });
    };
    const showAlert1 = (message, type) => {
        setAlert1({ open: true, message, type });
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlert({ ...alert, open: false });
    };
    const handleCloseAlert1 = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlert1({ ...alert, open: false });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await getCSRFToken();
            const data = new FormData();
            data.append("_method", "put");
            data.append("name", formData.name);
            data.append("email", formData.email);
            if (profileImg) {
                data.append("profile_img", profileImg);
            }

            for (var pair of data.entries()) {
                console.log(pair[0] + ", " + pair[1]);
            }

            const response = await axios.post(`/api/user/${user.id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            getUser();
            showAlert("更新が完了しました。", "success");
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (error) {
            if (!error.response.data.errors) {
                showAlert(error.response.data.error, "error");
            } else if (
                !error.response.data.errors.email &&
                !error.response.data.errors.profile_img
            ) {
                showAlert(error.response.data.errors.name, "error");
            } else if (
                !error.response.data.errors.name &&
                !error.response.data.errors.profile_img
            ) {
                showAlert(error.response.data.errors.email, "error");
            } else if (error.response.data.errors.profile_img) {
                showAlert(error.response.data.errors.profile_img, "error");
                //showAlert1(error.response.data.errors.email, "error");
            } else {
                showAlert(error.response.data.errors.name, "error");
                showAlert1(error.response.data.errors.email, "error");
            }
            // console.log(error);
        }
    };

    const handleImageChange = (e) => {
        try {
            setProfileImg(e.target.files[0]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            const user = JSON.parse(localStorage.getItem("user"));
            setUser(user);
            setFormData({
                name: user.name,
                email: user.email,
            });
        }
    }, []);

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: "100vh" }}
        >
            <Grid item xs={10} sm={8} md={6} lg={4}>
                <Paper elevation={3} style={{ padding: 16 }}>
                    <Typography variant="h6" align="center" gutterBottom>
                        Update Profile
                    </Typography>
                    <form onSubmit={handleUpdate}>
                        <TextField
                            type="text"
                            label="Name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            type="email"
                            label="Email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                            fullWidth
                            margin="normal"
                        />
                        <Box
                            display="flex"
                            justifyContent="center"
                            marginY={2}
                            sx={{ marginTop: "20px" }}
                        >
                            <input type="file" onChange={handleImageChange} />
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            sx={{ marginTop: 2 }}
                        >
                            更新する
                        </Button>
                        <CustomSnackbar
                            open={alert.open}
                            handleClose={handleCloseAlert}
                            message={alert.message}
                            type={alert.type}
                            id={0}
                        />
                        <CustomSnackbar
                            open={alert1.open}
                            handleClose={handleCloseAlert1}
                            message={alert1.message}
                            type={alert1.type}
                            id={1}
                        />
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default UpdateProfilePage;
