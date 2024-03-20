export function parseTimestamp(timestamp: number) {
  const date = new Date(timestamp);
  return `${date.toDateString()}, ${date.getHours()}:${date.getMinutes()}`;
}
