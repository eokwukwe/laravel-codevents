import { format, parseISO } from "date-fns";

/**
 * Format event date
 *
 * @param {String} date
 * @returns {Object} Formatted date
 */
export default function formattedEventDate(date) {
    const time = format(parseISO(date), "h:mm a");
    const day = format(parseISO(date), "dd MMM yyyy");
    const dateTime = format(parseISO(date), "MMMM d, yyyy h:mm a");

    return { time, day, dateTime };
}
