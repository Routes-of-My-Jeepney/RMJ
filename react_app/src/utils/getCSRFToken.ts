import axios from "../axios";

const getCSRFToken = async () => {
    await axios.get("/api/sanctum/csrf-cookie");
};

export default getCSRFToken;
