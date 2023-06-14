import axios from "../axios";

export async function postHistory(userId, origin, destination) {
    try {
        const res = await axios.post("api/history", {
            user_id: userId,
            origin: origin,
            destination: destination,
        });
        console.log(res.data);
    } catch (e) {
        console.error(e);
    }
}
