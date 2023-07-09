import axios from "axios";
const apiBaseUrl = axios.create({
    baseURL: "http://localhost:8080",
});

export const getUserAccount = async (url) => {
    const response = await apiBaseUrl(url, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("weblinksToken")}`,
        },
    });

    return response.data;
};

export const getUserProfile = (url) =>
    apiBaseUrl.get(url).then((res) => res.data);
