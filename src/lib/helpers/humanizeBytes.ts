/**
 * Format a bytes number into a readable string
 * @param bytes
 * @param options
 * @returns
 */
export function humanizeBytes(
  bytes: number,
  options: { isBinaryUnits?: boolean; decimals?: number; space?: boolean } = {},
): string {
  const { isBinaryUnits = false, decimals = 2, space = true } = options;

  if (decimals < 0) {
    throw new Error(`Invalid decimals ${decimals}`);
  }

  const base = isBinaryUnits ? 1000 : 1024;
  const units = isBinaryUnits
    ? ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"]
    : ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(base));

  const spaceText = space ? " " : "";

  return `${(bytes / Math.pow(base, i)).toFixed(decimals)}${spaceText}${units[i]}`;
}
