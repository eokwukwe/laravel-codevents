import helpers from "../../helpers";
import authRequests from "../../api/authRequests";

const state = {
    authLoading: false,
    registerErrors: {},
    verifyError: { message: "" },
    isVerified: {
        message: "",
        status: false
    },
    isRegistered: {
        message: "",
        status: false
    }
};

const getters = {
    isVerified: state => state.isVerified,
    authLoading: state => state.authLoading,
    verifyError: state => state.verifyError,
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
    },

    async verify({ commit }, requestData) {
        commit("loading-starts");

        try {
            const { data } = await authRequests.verifyEmail(requestData);

            commit("verify-success", data.message);
        } catch (error) {
            error.response.status === 422
                ? commit("verify-success", error.response.data.error.details)
                : commit("verify-error", error.response.data.error.details);
        } finally {
            commit("loading-ends");
        }
    }
};

const mutations = {
    "loading-ends": state => (state.authLoading = false),
    "loading-starts": state => (state.authLoading = true),
    "clear-errors": (state, error) => (state[error] = {}),
    "verify-success": (state, message) => {
        state.isVerified.status = true;
        state.isVerified.message = message;
    },
    "register-success": (state, message) => {
        state.isRegistered.status = true;
        state.isRegistered.message = message;
    },
    "verify-error": (state, msg) => (state.verifyError.message = msg),
    "register-errors": (state, errors) => (state.registerErrors = errors)
};

export default {
    state,
    getters,
    actions,
    mutations
};
