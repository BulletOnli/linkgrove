import axios from "axios";

const apiBaseUrl = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_KEY,
});

export const loginUser = async (url, data) => {
    const response = await apiBaseUrl.post(url, data);
    localStorage.setItem("weblinksToken", response?.data?.token);

    return response.data;
};

export const registerUser = async (url, data) => {
    const response = await apiBaseUrl.post(url, data);
    localStorage.setItem("weblinksToken", response?.data?.token);

    return response.data;
};

export const getRequest = async (url) => {
    const response = await apiBaseUrl.get(url, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("weblinksToken")}`,
        },
    });

    return response.data;
};

export const postRequest = async (url, data) => {
    const response = await apiBaseUrl.post(url, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("weblinksToken")}`,
        },
    });

    return response.data;
};

export const putRequest = async (url, data) => {
    const response = await apiBaseUrl.put(url, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("weblinksToken")}`,
        },
    });

    return response.data;
};

export const deleteRequest = async (url) => {
    const response = await apiBaseUrl.delete(url, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("weblinksToken")}`,
        },
    });

    return response.data;
};
