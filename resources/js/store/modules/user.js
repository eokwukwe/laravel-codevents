import helpers from "../../helpers";
import userRequests from "../../api/userRequests";

const state = {
    userErrors: {},
    userEvents: [],
    userProfile: {},
    userLoading: false,
    followLoading: false,
    userServerValidationErrors: {},
    userActionSuccess: { status: false, message: "" }
};

const getters = {
    userErrors: state => state.userErrors,
    userLoading: state => state.userLoading,
    userEvents: state => state.userEvents,
    userProfile: state => state.userProfile,
    followLoading: state => state.followLoading,
    userActionSuccess: state => state.userActionSuccess,
    userServerValidationErrors: state => state.userServerValidationErrors
};

const actions = {
    clearErrors({ commit }) {
        commit("clear-user-errors");
    },

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
    },

    async userRelationships({ commit }, userId) {
        commit("follow-loading-starts");

        try {
            const { data } = await userRequests.relationsShip(userId);

            commit("user-action-success", {
                status: true,
                message: data.message
            });
        } catch (error) {
            commit("user-loading-errors", {
                message: error.response.data.error.details
            });
        } finally {
            commit("follow-loading-ends");
        }
    },

    async updatePassword({ commit }, payload) {
        commit("user-loading-starts");

        try {
            const { data } = await userRequests.updatePassword(payload);

            commit("user-action-success", {
                status: true,
                message: data.message
            });
        } catch (error) {
            if (error.response.status === 422) {
                commit(
                    "server-validation-errors",
                    helpers.transformErrors(error.response.data.errors.details)
                );
            } else {
                commit("user-loading-errors", {
                    message: error.response.data.error.details
                });
            }
        } finally {
            commit("user-loading-ends");
        }
    }
};

const mutations = {
    "clear-user-errors": state => (state.userErrors = {}),
    "user-loading-ends": state => (state.userLoading = false),
    "user-loading-starts": state => (state.userLoading = true),
    "follow-loading-ends": state => (state.followLoading = false),
    "follow-loading-starts": state => (state.followLoading = true),
    "user-events": (state, payload) => (state.userEvents = payload),
    "user-profile": (state, payload) => (state.userProfile = payload),
    "user-loading-errors": (state, payload) => (state.userErrors = payload),
    "user-action-success": (state, payload) =>
        (state.userActionSuccess = payload),
    "server-validation-errors": (state, payload) =>
        (state.userServerValidationErrors = payload)
};

export default {
    state,
    getters,
    actions,
    mutations
};
