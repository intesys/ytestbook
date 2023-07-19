export const testbook_initialValues = {
  name: "",
  client: "",
};

export const testbook_validate = {
  name: (value: string) =>
    typeof value === "undefined" || value.length <= 0 ? "Campo obbligatorio" : null,
  client: (value: string) =>
    typeof value === "undefined" || value.length <= 0 ? "Campo obbligatorio" : null,
};
