import axios from "axios";

let api = axios.create({
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

export default request;
