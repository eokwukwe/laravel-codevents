import request from "./request";

export default {
    allEvents(page = 1) {
        return request().get(`/events?page=${page}`);
    },

    singleEvent(eventId) {
        return request().get(`/events/${eventId}`);
    },

    createEvent(payload) {
        return request().post("/events", payload);
    },

    updateEvent(payload) {
        return request().put(`/events/${payload.id}`, payload.data);
    },

    cancelEvent(eventId) {
        return request().delete(`/events/${eventId}`);
    },

    joinEvent(eventId) {
        return request().post(`/events/${eventId}/attendees`);
    },

    leaveEvent(eventId) {
        return request().delete(`/events/${eventId}/attendees`);
    },

    allEventComments(eventId) {
        return request().get(`/events/${eventId}/comments`);
    },

    addComment(payload) {
        const { eventId, comment } = payload;

        return request().post(`/events/${eventId}/comments`, comment);
    },

    updateComment(payload) {
        const { eventId, commentId, comment } = payload;

        return request().put(
            `/events/${eventId}/comments/${commentId}`,
            comment
        );
    },

    deleteComment(payload) {
        const { eventId, commentId } = payload;

        return request().delete(`/events/${eventId}/comments/${commentId}`);
    }
};
