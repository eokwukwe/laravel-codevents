import helpers from "../../helpers";
import userRequests from "../../api/userRequests";

const state = {
    userErrors: {},
    userLoading: false,
    userSuccess: {
        status: false,
        data: {},
        message: ""
    },
    userServerValidationErrors: {}
};

const getters = {
    userErrors: state => state.userErrors,
    userLoading: state => state.userLoading,
    userSuccess: state => state.userSuccess,
    userServerValidationErrors: state => state.userServerValidationErrors
};
const actions = {};

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
