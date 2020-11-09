import helpers from "../../helpers";
import eventRequests from "../../api/eventRequests";

const state = {
    eventErrors: {},
    allEvents: {},
    singleEvent: {},
    eventLoading: false,
    eventActionSuccess: {
        status: false,
        message: ""
    },
    eventServerValidationErrors: {}
};

const getters = {
    allEvents: state => state.allEvents,
    eventErrors: state => state.eventErrors,
    singleEvent: state => state.singleEvent,
    eventLoading: state => state.eventLoading,
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

    async updateEvent({ commit }, payload) {
        commit("event-action-starts");

        try {
            const { data } = await eventRequests.updateEvent(payload);

            helpers.logJSON(data);

            commit("event-action-success", {
                status: true,
                message: data.message
            });
        } catch (error) {

            helpers.logJSON(
                helpers.transformErrors(error.response.data.errors.details)
            );

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
    }
};

const mutations = {
    "clear-event-errors": (state, error) => (state[error] = {}),
    "event-action-ends": state => (state.eventLoading = false),
    "event-action-starts": state => (state.eventLoading = true),
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
