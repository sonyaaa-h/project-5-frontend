import axios from "axios";

export const api = axios.create({
    baseURL: "https://spendy-mu36.onrender.com",
});

export const setAuthHeader = (token) => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
    api.defaults.headers.common.Authorization = "";
};
