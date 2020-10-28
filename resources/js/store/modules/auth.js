import authRequests from "../../api/authRequests";
import helpers from "../../helpers";

const state = {
    authLoading: false,
    registerErrors: {},
    isRegistered: {
        status: false,
        message: ""
    }
};

const getters = {
    authLoading: state => state.authLoading,
    isRegistered: state => state.isRegistered,
    registerErrors: state => state.registerErrors
};

const actions = {
    clearErrors({ commit }, error) {
        commit("clear-errors", error);
    },

    async register({ commit }, registerData) {
        commit("loading-starts");

        try {
            const { data } = await authRequests.register(registerData);

            commit("register-success", data.message);
        } catch (error) {
            if (error.response.status === 422) {
                commit(
                    "register-errors",
                    helpers.transformErrors(error.response.data.errors.details)
                );
            }
        } finally {
            commit("loading-ends");
        }
    }
};

const mutations = {
    "loading-ends": state => (state.authLoading = false),
    "loading-starts": state => (state.authLoading = true),
    "clear-errors": (state, error) => (state[error] = {}),
    "register-success": (state, responseMessage) => {
        state.isRegistered.status = true;
        state.isRegistered.message = responseMessage;
    },
    "register-errors": (state, errors) => (state.registerErrors = errors)
};

export default {
    state,
    getters,
    actions,
    mutations
};
