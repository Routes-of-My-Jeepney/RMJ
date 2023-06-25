import axios from "../axios";
import getCSRFToken from "../utils/getCSRFToken";

export async function postHistory(origin, destination) {
    try {
        getCSRFToken();
        const res = await axios.post("/api/history", {
            origin: origin,
            destination: destination,
        });
        console.log(res.data);
    } catch (e) {
        console.error(e);
    }
}
