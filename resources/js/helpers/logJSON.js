export default function logJSON(data) {
    typeof data === "string"
        ? console.log(data)
        : console.log(JSON.stringify(data, null, 2));
}
