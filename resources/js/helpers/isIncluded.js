/**
 * Check is the user is a member of the collections
 * This can be collections of followers, attendees, or followings
 *
 * @param {Array} collections Array of user collections
 * @param {String} userId
 * @returns {Boolean}
 */
export default function isIncluded(collections, userId) {
    return collections
        ?.map(collection => (id = collection?.id))
        .includes(userId);

    this.event?.attendees?.some(a => a.id === this.loggedInUser.id);
}
