import helpers from "../../helpers";
import eventRequests from "../../api/eventRequests";

const state = {
    eventErrors: {},
    allEvents: {},
    singleEvent: {},
    eventLoading: false,
    joinEventLoading: false,
    eventServerValidationErrors: {},
    eventActionSuccess: { status: false, message: "" },
};

const getters = {
    allEvents: state => state.allEvents,
    eventErrors: state => state.eventErrors,
    singleEvent: state => state.singleEvent,
    eventLoading: state => state.eventLoading,
    joinEventLoading: state => state.joinEventLoading,
    eventActionSuccess: state => state.eventActionSuccess,
    eventServerValidationErrors: state => state.eventServerValidationErrors
};

const actions = {
    clearErrors({ commit }, error) {
        commit("clear-event-errors", error);
    },

    async getAllEvents({ commit }, page) {
        commit("event-action-starts");

        try {
            const { data } = await eventRequests.allEvents(page);

            commit("all-events", data);
        } catch (error) {
            commit("event-action-errors", {
                message: error.response.data.error.details
            });
        } finally {
            commit("event-action-ends");
        }
    },

    async getSingleEvent({ commit }, eventId) {
        commit("event-action-starts");

        try {
            const { data } = await eventRequests.singleEvent(eventId);

            commit("single-event", data.data);
        } catch (error) {
            commit("event-action-errors", {
                message: error.response.data.error.details
            });
        } finally {
            commit("event-action-ends");
        }
    },

    async createEvent({ commit }, payload) {
        commit("event-action-starts");

        try {
            await eventRequests.createEvent(payload);

            commit("event-action-success", {
                status: true,
                message: "Event create successfully"
            });
        } catch (error) {
            if (error.response.status === 422) {
                commit(
                    "server-validation-errors",
                    helpers.transformErrors(error.response.data.errors.details)
                );
            } else {
                commit("event-action-errors", {
                    message: error.response.data.error.details
                });
            }
        } finally {
            commit("event-action-ends");
        }
    },

    async updateEvent({ commit }, payload) {
        commit("event-action-starts");

        try {
            const { data } = await eventRequests.updateEvent(payload);

            commit("event-action-success", {
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
                commit("event-action-errors", {
                    message: error.response.data.error.details
                });
            }
        } finally {
            commit("event-action-ends");
        }
    },

    async joinEvent({ commit }, eventId) {
        commit("join-action-starts");

        try {
            const { data } = await eventRequests.joinEvent(eventId);

            commit("event-action-success", {
                status: true,
                message: data.message
            });
        } catch (error) {
            commit("event-action-errors", {
                message: error.response.data.error.details
            });
        } finally {
            commit("join-action-ends");
        }
    },

    async leaveEvent({ commit }, eventId) {
        commit("join-action-starts");

        try {
            const { data } = await eventRequests.leaveEvent(eventId);

            commit("event-action-success", {
                status: true,
                message: data.message
            });
        } catch (error) {
            commit("event-action-errors", {
                message: error.response.data.error.details
            });
        } finally {
            commit("join-action-ends");
        }
    }
};

const mutations = {
    "clear-event-errors": (state, error) => (state[error] = {}),
    "event-action-ends": state => (state.eventLoading = false),
    "event-action-starts": state => (state.eventLoading = true),
    "join-action-ends": state => (state.joinEventLoading = false),
    "join-action-starts": state => (state.joinEventLoading = true),
    "all-events": (state, payload) => (state.allEvents = payload),
    "single-event": (state, payload) => (state.singleEvent = payload),
    "event-action-errors": (state, payload) => (state.eventErrors = payload),
    "event-action-success": (state, payload) =>
        (state.eventActionSuccess = payload),
    "server-validation-errors": (state, payload) =>
        (state.eventServerValidationErrors = payload)
};

export default {
    state,
    getters,
    actions,
    mutations
};
