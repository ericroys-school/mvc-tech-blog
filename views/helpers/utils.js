/**
 * Format milliseconds into text date having date and time
 * @param {milliseconds} d time in milliseconds
 * @returns - a formatted date string as 7/1/2024 8:22:12
 */
export function formatDateTime(d) {
  let dt = new Date(Number(d));
  return `${dt.getMonth()}/${dt.getDay()}/${dt.getFullYear()} @ ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`;
}

/**
 * Format milliseconds into text date having date only
 * @param {milliseconds} d time in milliseconds
 * @returns - a formatted date string as 7/1/2024
 */
export function formatDate(d) {
  let dt = new Date(Number(d));
  return `${dt.getMonth()}/${dt.getDay()}/${dt.getFullYear()}`;
}
