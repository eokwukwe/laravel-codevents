import axios from "axios";
import store from '../store'

const api = axios.create({
    headers: {
        Accept: "application/json",
        "Content-type": "application/json, multipart/form-data"
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

request().interceptors.response.use(undefined, function(error) {
    if (
        error.response.status === 401 &&
        error.response.data.error.title === "Unauthenticated"
    ) {
        store.dispatch("clearLocalStorage");
        store.dispatch("showAuthModal", {
            status: true,
            messageTitle: "Your Session has Expired",
            messageContent: "Please, login again to continue."
        });
    }

    return Promise.reject(error);
});

export default request;
