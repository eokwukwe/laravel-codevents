import helpers from "../../helpers";
import authRequests from "../../api/authRequests";

const state = {
    asyncError: {},
    isLoggedIn: false,
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
    isLoggedIn: state => state.isLoggedIn,
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
    },

    async login({ commit }, loginData) {
        commit("loading-starts");

        try {
            const { data } = await authRequests.login(loginData);

            localStorage.setItem("token", data.data.token);

            commit("login-success");

            commit("async-success", {
                data: {},
                status: true,
                message: "Login successful 🚀"
            });
        } catch (error) {
            error.response.status === 422 || error.response.status === 429
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

    async logout({ commit }) {
        commit("loading-starts");

        try {
          await authRequests.logout();

            localStorage.removeItem("token");

            commit("logout-success");
        } catch (error) {
            console.error(JSON.stringify(error.response.data, null, 2));
        } finally {
            commit("loading-ends");
        }
    }
};

const mutations = {
    "login-success": state => (state.isLoggedIn = true),
    "logout-success": state => (state.isLoggedIn = false),
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
