import helpers from "../../helpers";
import eventRequests from "../../api/eventRequests";

const state = {
    comments: {},
    allEvents: {},
    eventErrors: {},
    singleEvent: {},
    commentError: {},
    eventLoading: false,
    commentLoading: false,
    joinEventLoading: false,
    eventServerValidationErrors: {},
    eventActionSuccess: { status: false, message: "" }
};

const getters = {
    comments: state => state.comments,
    allEvents: state => state.allEvents,
    eventErrors: state => state.eventErrors,
    singleEvent: state => state.singleEvent,
    eventLoading: state => state.eventLoading,
    commentError: state => state.commentError,
    commentLoading: state => state.commentLoading,
    joinEventLoading: state => state.joinEventLoading,
    eventActionSuccess: state => state.eventActionSuccess,
    eventServerValidationErrors: state => state.eventServerValidationErrors
};

const actions = {
    clearErrors({ commit }, error) {
        commit("clear-event-errors", error);
    },

    async getAllEvents({ commit }, query) {
        commit("event-action-starts");

        try {
            const { data } = await eventRequests.allEvents(query);

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

    async cancelEvent({ commit }, eventId) {
        commit("event-action-starts");

        try {
            const { data } = await eventRequests.cancelEvent(eventId);

            commit("event-action-success", {
                status: true,
                message: data.message
            });
        } catch (error) {
            commit("event-action-errors", {
                message: error.response.data.error.details
            });
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
    },

    async getEventComments({ commit }, eventId) {
        commit("comment-action-starts");

        try {
            const { data } = await eventRequests.allEventComments(eventId);

            commit("all-event-comments", data.data);
        } catch (error) {
            commit("comment-action-errors", {
                message: error.response.data.error.details
            });
        } finally {
            commit("comment-action-ends");
        }
    },

    async addEventComment({ commit }, payload) {
        commit("comment-action-starts");

        try {
            const { data } = await eventRequests.addComment(payload);

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
                commit("comment-action-errors", {
                    message: error.response.data.error.details
                });
            }
        } finally {
            commit("comment-action-ends");
        }
    },

    async updateEventComment({ commit }, payload) {
        commit("comment-action-starts");

        try {
            const { data } = await eventRequests.updateComment(payload);

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
                commit("comment-action-errors", {
                    message: error.response.data.error.details
                });
            }
        } finally {
            commit("comment-action-ends");
        }
    },

    async deleteEventComment({ commit }, payload) {
        commit("comment-action-starts");

        try {
            const { data } = await eventRequests.deleteComment(payload);

            commit("event-action-success", {
                status: true,
                message: data.message
            });
        } catch (error) {
            commit("comment-action-errors", {
                message: error.response.data.error.details
            });
        } finally {
            commit("comment-action-ends");
        }
    }
};

const mutations = {
    "clear-event-errors": (state, error) => (state[error] = {}),
    "event-action-ends": state => (state.eventLoading = false),
    "event-action-starts": state => (state.eventLoading = true),
    "join-action-ends": state => (state.joinEventLoading = false),
    "join-action-starts": state => (state.joinEventLoading = true),
    "comment-action-ends": state => (state.commentLoading = false),
    "comment-action-starts": state => (state.commentLoading = true),

    "all-events": (state, payload) => (state.allEvents = payload),
    "single-event": (state, payload) => (state.singleEvent = payload),
    "all-event-comments": (state, payload) => (state.comments = payload),
    "event-action-errors": (state, payload) => (state.eventErrors = payload),
    "comment-action-errors": (state, payload) => (state.commentError = payload),
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
