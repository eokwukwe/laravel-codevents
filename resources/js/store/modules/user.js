import helpers from "../../helpers";
import userRequests from "../../api/userRequests";

const state = {
    userErrors: {},
    userLoading: false,
    userSuccess: {
        data: {},
        message: "",
        status: false
    },
    userServerValidationErrors: {}
};

const getters = {
    userErrors: state => state.userErrors,
    userLoading: state => state.userLoading,
    userSuccess: state => state.userSuccess,
    userServerValidationErrors: state => state.userServerValidationErrors
};
const actions = {
    async getProfile({ commit }, id) {
        commit("user-loading-starts");

        try {
            const { data } = await userRequests.profile(id);

            commit("user-success", {
                status: true,
                message: "",
                data: data.data
            });
        } catch (error) {
            commit("clear-user-errors", {
                message: error.response.data.error.details
            });
        } finally {
            commit("user-loading-ends");
        }
    }
};

const mutations = {
    "user-loading-ends": state => (state.userLoading = false),
    "user-loading-starts": state => (state.userLoading = true),
    "clear-user-errors": (state, error) => (state[error] = {}),
    "user-success": (state, payload) => (state.userSuccess = payload),
    "server-validation-errors": (state, payload) =>
        (state.userServerValidationErrors = payload)
};

export default {
    state,
    getters,
    actions,
    mutations
};
