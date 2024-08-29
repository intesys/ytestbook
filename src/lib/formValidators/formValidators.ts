export const isValidWebSocketUrl = (value: string) => {
  const pattern =
    /^(wss?:\/\/)([0-9]{1,3}(?:\.[0-9]{1,3}){3}|[a-zA-Z]+):([0-9]{1,5})$/;

  if (!pattern.test(value)) {
    return "Field must be a valid URL";
  }

  return null;
};
