import dayjsConfigured from "./dayjsConfigured";

export function parseTimestamp(timestamp: number) {
  const date = new Date(timestamp);
  const dateDayJs = dayjsConfigured(date);

  return dateDayJs.format("llll");
}
