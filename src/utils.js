export function convertUTCToLocal(date) {
    // convert date object from UTC to local time
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return date;
}