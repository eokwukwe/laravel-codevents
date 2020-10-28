export default function hasServerError(errorObj, field) {
    return Object.keys(errorObj).includes(field);
}
