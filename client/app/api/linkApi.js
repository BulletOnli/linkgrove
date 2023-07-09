import axios from "axios";
const apiBaseUrl = axios.create({
    baseURL: "http://localhost:8080",
});

export const getLink = async (url, id) => {
    const response = await apiBaseUrl.get(`${url}/${id}`);
    return response.data;
};

export const createLink = async (url, data) => {
    const response = await apiBaseUrl.post(url, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("weblinksToken")}`,
        },
    });
};

export const deleteLink = async (url, id) => {
    await apiBaseUrl.delete(`${url}/${id}`);
};
