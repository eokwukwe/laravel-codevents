import request from "./request";

export default {
    register(data) {
        return request().post("/register", data);
    },

    login(data) {
        return request().post("/login", data);
    },

    verifyEmail(data) {
        return request().post(`/verification/verify/${data.id}?${data.query}`);
    },

    resendVerificationLink(data) {
        return request().post("/verification/resend", data);
    },

    resetPasswordLink(data) {
        return request().post("/password/resetEmail", data);
    },

    logout() {
        return request().post("/logout");
    },

    loggedInUser() {
        return request().get("/me");
    }
};
