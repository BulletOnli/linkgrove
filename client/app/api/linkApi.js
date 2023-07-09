import axios from "axios";
const apiBaseUrl = axios.create({
    baseURL: "http://localhost:8080",
});

export const getLink = async (url) => {
    const response = await apiBaseUrl.get(url);
    return response.data;
};

export const createLink = async (url, data) => {
    const response = await apiBaseUrl.post(url, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("weblinksToken")}`,
        },
    });
};

export const updateLink = async (url, data) => {
    await apiBaseUrl.put(url, data);
};

export const deleteLink = async (url) => {
    await apiBaseUrl.delete(url);
};
