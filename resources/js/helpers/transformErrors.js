import { transform } from "lodash";

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
