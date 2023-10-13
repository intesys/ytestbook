export const testbookInitialValues = {
  name: "",
  client: "",
};

export const testbookValidate = {
  name: (value: string) =>
    typeof value === "undefined" || value.length <= 0 ? "Campo obbligatorio" : null,
  client: (value: string) =>
    typeof value === "undefined" || value.length <= 0 ? "Campo obbligatorio" : null,
};
