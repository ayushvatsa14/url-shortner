import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const loginUser = async (password, email) => {
    const { data } = await axios.post(`${BASE_URL}/api/auth/login`, { email, password }, {
        withCredentials: true,
        timeout: 10000
    });
    return data;
};

export const registerUser = async (name, password, email) => {
    const { data } = await axios.post(`${BASE_URL}/api/auth/register`, { name, email, password }, {
        withCredentials: true,
        timeout: 10000
    });
    return data;
};

export const logoutUser = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/auth/logout`, {
        withCredentials: true,
        timeout: 10000
    });
    return data;
};

export const getCurrentUser = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/auth/me`, {
        withCredentials: true,
        timeout: 10000
    });
    
    return data;
};

export const getAllUserUrls = async () => {
    const { data } = await axios.post(`${BASE_URL}/api/user/urls`, {}, {
        withCredentials: true,
        timeout: 10000
    });

    return data;
};