import helpers from "../../helpers";
import eventRequests from "../../api/eventRequests";

const state = {
    eventErrors: {},
    allEvents: [],
    singleEvent: {},
    eventLoading: false,
    eventServerValidationErrors: {}
};

const getters = {
    allEvents: state => state.allEvents,
    eventErrors: state => state.eventErrors,
    singleEvent: state => state.singleEvent,
    eventLoading: state => state.eventLoading,
    eventServerValidationErrors: state => state.eventServerValidationErrors
};

const actions = {
    async getAllEvents({ commit }, page) {
        commit("event-loading-starts");

        try {
            const { data } = await eventRequests.allEvents(page);

            commit("all-events", data);
        } catch (error) {
            commit("event-loading-errors", {
                message: error.response.data.error.details
            });
        } finally {
            commit("event-loading-ends");
        }
    },

    async getSingleEvent({ commit }, eventId) {
        commit("event-loading-starts");

        try {
            const { data } = await eventRequests.singleEvent(eventId);

            commit("single-event", data.data);
        } catch (error) {
            commit("event-loading-errors", {
                message: error.response.data.error.details
            });
        } finally {
            commit("event-loading-ends");
        }
    }
};

const mutations = {
    "clear-event-errors": state => (state.eventErrors = {}),
    "event-loading-ends": state => (state.eventLoading = false),
    "event-loading-starts": state => (state.eventLoading = true),
    "all-events": (state, payload) => (state.allEvents = payload),
    "single-event": (state, payload) => (state.singleEvent = payload),
    "event-loading-errors": (state, payload) => (state.eventErrors = payload),
    "server-validation-errors": (state, payload) =>
        (state.eventServerValidationErrors = payload)
};

export default {
    state,
    getters,
    actions,
    mutations
};
