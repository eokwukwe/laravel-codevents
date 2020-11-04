import request from "./request";

export default {
    profile(userId) {
        return request().get(`users/${userId}/profile`);
    },

    events(userId) {
        return request().get(`users/${userId}/events`);
    }
};
