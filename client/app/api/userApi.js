import axios from "axios";
const apiBaseUrl = axios.create({
    baseURL: "http://localhost:8080",
});

export const getUserProfile = (url) =>
    apiBaseUrl.get(url).then((res) => res.data);

export const getUserAccountDetails = async (url) => {
    const response = await apiBaseUrl.get(url, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("weblinksToken")}`,
        },
    });

    return response.data;
};

export const updateAccountDetails = async (url, data) => {
    const response = await apiBaseUrl.put(url, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("weblinksToken")}`,
        },
    });

    return response.data;
};
