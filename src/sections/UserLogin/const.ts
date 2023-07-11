export const userLogin_initialValues = {
  username: "",
  password: "",
  remember: false,
};

export const userLogin_validate = {
  username: (value: string) =>
    typeof value === "undefined" || value.length <= 0 ? "Campo obbligatorio" : null,
  password: (value: string) =>
    typeof value === "undefined" || value.length <= 0
      ? "Campo obbligatorio"
      : value.length <= 6
      ? "Password should include at least 6 characters"
      : null,
};
