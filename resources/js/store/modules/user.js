import helpers from "../../helpers";
import userRequests from "../../api/userRequests";

const state = {
    userErrors: {},
    userEvents: [],
    userProfile: {},
    userLoading: false,
    userServerValidationErrors: {}
};

const getters = {
    userErrors: state => state.userErrors,
    userLoading: state => state.userLoading,
    userEvents: state => state.userEvents,
    userProfile: state => state.userProfile,
    userServerValidationErrors: state => state.userServerValidationErrors
};

const actions = {
    async getUserProfile({ commit }, userId) {
        commit("user-loading-starts");

        try {
            const { data } = await userRequests.profile(userId);

            commit("user-profile", data.data);
        } catch (error) {
            commit("user-loading-errors", {
                message: error.response.data.error.details
            });
        } finally {
            commit("user-loading-ends");
        }
    },

    async getUserEvents({ commit }, userId) {
        commit("user-loading-starts");

        try {
            const { data } = await userRequests.events(userId);

            commit("user-events", data.data);
        } catch (error) {
            commit("user-loading-errors", {
                message: error.response.data.error.details
            });
        } finally {
            commit("user-loading-ends");
        }
    }
};

const mutations = {
    "clear-user-errors": state => (state.userErrors = {}),
    "user-loading-ends": state => (state.userLoading = false),
    "user-loading-starts": state => (state.userLoading = true),
    "user-events": (state, payload) => (state.userEvents = payload),
    "user-profile": (state, payload) => (state.userProfile = payload),
    "user-loading-errors": (state, payload) => (state.userErrors = payload),
    "server-validation-errors": (state, payload) =>
        (state.userServerValidationErrors = payload)
};

export default {
    state,
    getters,
    actions,
    mutations
};
