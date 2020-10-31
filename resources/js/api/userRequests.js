import request from "./request";

export default {
    profile(id) {
        return request().get(`users/${id}/profile`);
    }
};
