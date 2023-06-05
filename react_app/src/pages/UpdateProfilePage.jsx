import { TextField, Button } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import axios from "../axios";
import UserContext from "../contexts/UserContext";
import { Grid, Paper, Typography } from "@mui/material";
import getCSRFToken from "../utils/getCSRFToken";
import { set } from "lodash";

const UpdateProfilePage = () => {
    const [profileImg, setProfileImg] = useState(null);
    const { isLoggedIn, getUser } = useContext(UserContext);
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await getCSRFToken();
            // for (var pair of formData.entries()) {
            //     console.log(pair[0] + ", " + pair[1]);
            // }
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
        } catch (error) {
            console.log(error);
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
                </form>
            </Paper>
        </Grid>
    );
};

export default UpdateProfilePage;
