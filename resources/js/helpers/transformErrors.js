/**
 * Transform the validation eroror from the server from an
 * array of objects to object of objects
 *
 * @param {Array} errors
 * @returns {Object} error object
 */
export default function transformErrors(errors = []) {
    if (errors.length <= 0) {
        return;
    }

    const errorObj = errors.reduce((error, current) => {
        const currentError = {
            [Object.keys(current)[0]]: Object.values(current)[0]
        };

        return { ...error, ...currentError };
    }, {});

    return errorObj;
}
