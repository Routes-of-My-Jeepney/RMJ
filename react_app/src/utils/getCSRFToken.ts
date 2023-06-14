import axios from "../axios";

const getCSRFToken = async () => {
    await axios.get("/sanctum/csrf-cookie");
};

export default getCSRFToken;
