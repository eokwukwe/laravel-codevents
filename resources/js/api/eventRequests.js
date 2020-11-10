import request from "./request";

export default {
    allEvents(page = 1) {
        return request().get(`/events?page=${page}`);
    },

    singleEvent(eventId) {
        return request().get(`/events/${eventId}`);
    },

    createEvent(payload) {
        return request().post('/events', payload)
    },

    updateEvent(payload) {
        return request().put(`/events/${payload.id}`, payload.data)
    },

    joinEvent(eventId) {
        return request().post(`/events/${eventId}/attendees`);
    },

    leaveEvent(eventId) {
        return request().delete(`/events/${eventId}/attendees`);
    }
};
