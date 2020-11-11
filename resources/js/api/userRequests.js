import request from "./request";

export default {
    profile(userId) {
        return request().get(`/users/${userId}/profile`);
    },

    events(userId) {
        return request().get(`/users/${userId}/events`);
    },

    relationsShip(userId){
        return request().post(`/users/${userId}/relationships`)
    },

    updatePassword(passwordData){
        return request().put("/settings/password", passwordData)
    }
};
