export const detachObjectFromAutomergeProps = <T extends object>(obj: T): T => {
  const newObj: Record<string, unknown> = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === "object" && value !== null) {
      // Recursively detach nested objects
      newObj[key] = detachObjectFromAutomergeProps(value);
      return;
    }
    newObj[key] = value;
  });

  return newObj as T;
};
