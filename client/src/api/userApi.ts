import axios from "axios";

// export const API_URL = "https://linkgrove-server.onrender.com";
export const API_URL = "http://localhost:8080";

export const fetchAccountUser = async () => {
    const response = await axios.get(`${API_URL}/users/details`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("weblinksToken")}`,
        },
    });

    return response.data;
};
