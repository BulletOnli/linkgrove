import axios from "axios";
import { API_URL } from "./userApi";

const refreshAccessToken = async () => {
    const response = await axios.get(`${API_URL}/auth/refresh`, {
        withCredentials: true,
    });

    return response.data.token;
};

export default refreshAccessToken;
