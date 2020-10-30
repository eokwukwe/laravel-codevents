import helpers from "../../helpers";
import authRequests from "../../api/authRequests";

const state = {
    asyncError: {},
    authLoading: false,
    serverValidationErrors: {},
    asyncSuccess: {
        data: {},
        message: "",
        status: false
    }
};

const getters = {
    asyncError: state => state.asyncError,
    authLoading: state => state.authLoading,
    asyncSuccess: state => state.asyncSuccess,
    serverValidationErrors: state => state.serverValidationErrors
};

const actions = {
    clearErrors({ commit }, error) {
        commit("clear-errors", error);
    },

    async register({ commit }, registerData) {
        commit("loading-starts");

        try {
            const { data } = await authRequests.register(registerData);

            commit("async-success", {
                data: {},
                status: true,
                message: data.message
            });
        } catch (error) {
            if (error.response.status === 422) {
                commit(
                    "server-validation-errors",
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

            commit("async-success", {
                data: {},
                status: true,
                message: data.message
            });
        } catch (error) {
            error.response.status === 422
                ? commit("async-success", {
                      data: {},
                      status: true,
                      message: error.response.data.error.details
                  })
                : commit("async-error", {
                      message: error.response.data.error.details
                  });
        } finally {
            commit("loading-ends");
        }
    },

    async resend({ commit }, resendData) {
        commit("loading-starts");

        try {
            const { data } = await authRequests.resendVerificationLink(
                resendData
            );

            commit("async-success", {
                data: {},
                status: true,
                message: data.message
            });
        } catch (error) {
            error.response.status === 422
                ? commit(
                      "server-validation-errors",
                      helpers.transformErrors(
                          error.response.data.errors.details
                      )
                  )
                : commit("async-error", {
                      message: error.response.data.error.details
                  });
        } finally {
            commit("loading-ends");
        }
    },

    async passwordResetLink({ commit }, resetLinkData) {
        commit("loading-starts");

        try {
            const { data } = await authRequests.forgotPassword(resetLinkData);

            commit("async-success", {
                data: {},
                status: true,
                message: data.message
            });
        } catch (error) {
            commit("async-error", {
                message: error.response.data.errors.details[0].email
            });
        } finally {
            commit("loading-ends");
        }
    },

    async resetPassword({ commit }, resetData) {
        commit("loading-starts");

        try {
            const { data } = await authRequests.resetPassword(resetData);

            commit("async-success", {
                data: {},
                status: true,
                message: data.message
            });
        } catch (error) {
            const e = helpers.transformErrors(
                error.response.data.errors.details
            );

            commit("async-error", {
                message: Object.values(e)[0]
            });
        } finally {
            commit("loading-ends");
        }
    }
};

const mutations = {
    "loading-ends": state => (state.authLoading = false),
    "loading-starts": state => (state.authLoading = true),
    "clear-errors": (state, error) => (state[error] = {}),
    "async-error": (state, payload) => (state.asyncError = payload),
    "async-success": (state, payload) => (state.asyncSuccess = payload),
    "server-validation-errors": (state, errors) =>
        (state.serverValidationErrors = errors)
};

export default {
    state,
    getters,
    actions,
    mutations
};
