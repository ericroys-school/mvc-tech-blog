/**
 * Format milliseconds into text date
 * @param {milliseconds} d time in milliseconds
 * @returns - a formatted date string as 7/1/2024 8:22:12
 */
export function formatDate(d) {
  let dt = new Date(Number(d));
  return `${dt.getMonth()}/${dt.getDay()}/${dt.getFullYear()} @ ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`;
}
