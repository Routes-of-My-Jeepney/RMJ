import { TextField, Button } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import axios from "../axios";
import UserContext from "../contexts/UserContext";
import { Grid, Paper, Typography } from "@mui/material";
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
    const [alert, setAlert] = useState({ open: false, message: "", type: "" });

    const showAlert = (message, type) => {
        setAlert({ open: true, message, type });
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlert({ ...alert, open: false });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await getCSRFToken();
            console.log("===============");
            console.log(formData.name);
            console.log(profileImg);
            console.log("===============");
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
            console.log(response);
            getUser();
            showAlert("更新が完了しました。", "success");
            // setTimeout(() => {
            //     navigate("/");
            // }, 1000);
        } catch (error) {
            console.log(error);
            setErrorMessage(error.response.data.error);
            setTimeout(() => {
                showAlert(errorMessage, "error");
            }, 200);
        }
    };

    const handleImageChange = (e) => {
        setProfileImg(e.target.files[0]);
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
        <Grid container justify="center" style={{ paddingTop: "40%" }}>
            <Paper style={{ padding: 16 }}>
                <Typography variant="h4">Update</Typography>
                <form onSubmit={handleUpdate}>
                    <TextField
                        type="text"
                        label="name"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                    />
                    <TextField
                        type="email"
                        label="email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />
                    <input type="file" onChange={handleImageChange} />
                    <Button type="submit">Update</Button>
                    <CustomSnackbar
                        open={alert.open}
                        handleClose={handleCloseAlert}
                        message={alert.message}
                        type={alert.type}
                        id={0}
                    />
                </form>
            </Paper>
        </Grid>
    );
};

export default UpdateProfilePage;
