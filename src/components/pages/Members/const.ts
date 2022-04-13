var md5 = require("md5");

export const initialFields = {
  id: md5(new Date().toString()),
  name: "",
  surname: "",
  role: "",
};
