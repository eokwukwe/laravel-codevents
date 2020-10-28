import authRequests from "../../api/authRequests";
import transformErrors from "../../helpers/transformErrors";

const state = {
    asyncLoading: false,
    registerErrors: null
};

const getters = {
    asyncLoading: state => state.asyncLoading,
    registerErrors: state => state.registerErrors
};

const actions = {
    clearErrors({ commit }, error) {
        commit("clear-errors", error);
    },

    async register({ commit }, registerData) {
        commit("loading-starts");

        try {
            await authRequests.register(registerData);
        } catch (error) {
            if (error.response.status === 422) {
                commit(
                    "register-errors",
                    transformErrors(error.response.data.errors.details)
                );
            }
        } finally {
            commit("loading-ends");
        }
    }
};

const mutations = {
    "loading-ends": state => (state.asyncLoading = false),
    "loading-starts": state => (state.asyncLoading = true),
    "clear-errors": (state, error) => (state[error] = null),
    "register-errors": (state, errors) => (state.registerErrors = errors)
};

export default {
    state,
    getters,
    actions,
    mutations
};
