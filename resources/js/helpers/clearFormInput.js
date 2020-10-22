/**
 * Clear form input after form submission
 * 
 * @param {Object} param options
 */
export default function clearFormInput({ validationReset, formData }) {
    validationReset();

    for (const key in formData) {
        formData[key] = "";
    }

    return formData;
}
