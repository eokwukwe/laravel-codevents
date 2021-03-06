import request from "./request";

export default {
    register(data) {
        return request().post("/register", data);
    },

    verifyEmail(data) {
        return request().post(`/verification/verify/${data.id}?${data.query}`);
    },

    resendVerificationLink(data) {
        return request().post("/verification/resend", data);
    },

    forgotPassword(data) {
        return request().post("/password/reset-link", data);
    },

    resetPassword(data) {
        return request().post("/password/reset", data);
    },

    login(data) {
        return request().post("/login", data);
    },

    logout() {
        return request().post("/logout");
    },

    loggedInUser() {
        return request().get("/me");
    },
};
