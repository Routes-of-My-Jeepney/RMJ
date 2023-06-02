import { TextField, Button } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import axios from "../axios";
import UserContext from "../contexts/UserContext";
import { Grid, Paper, Typography } from "@mui/material";
import getCSRFToken from "../utils/getCSRFToken";

const UpdateProfilePage = () => {
    const [profileImage, setProfileImage] = useState(null);
    const { user, getUser } = useContext(UserContext);
    const [email, setEmail] = useState("");

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", email);
        formData.append("profile_image", profileImage);

        try {
            await getCSRFToken();
            for (var pair of formData.entries()) {
                console.log(pair[0] + ", " + pair[1]);
            }
            const response = await axios.put(`/api/user/${user.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            // do something with response, update user state
        } catch (error) {
            // handle error
        }
    };

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    useEffect(() => {
        if (user) {
            setEmail(user.email);
        }
    }, [user]);

    useEffect(() => {
        getUser();
    }, []);

    return (
        <Grid container justify="center" style={{ paddingTop: "40%" }}>
            <Paper style={{ padding: 16 }}>
                <Typography variant="h4">Update</Typography>
                <form onSubmit={handleUpdate}>
                    <TextField
                        type="email"
                        label="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input type="file" onChange={handleImageChange} />
                    <Button type="submit">Update</Button>
                </form>
            </Paper>
        </Grid>
    );
};

export default UpdateProfilePage;
