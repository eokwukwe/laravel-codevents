import axios from "axios";

const api = axios.create({
    headers: {
        Accept: "application/json",
        "Content-type": "application/json"
    },
    baseURL:
        process.env.NODE_ENV === "development"
            ? process.env.MIX_DEV_BASE_URL
            : process.env.MIX_PROD_BASE_URL
});

const request = () => {
    let token = localStorage.getItem("token");

    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return api;
};

export const token = process.env.MIX_MAPBOX_ACCESS_TOKEN;

export default request;
