var md5 = require("md5");

export const initialFields = {
  id: md5(new Date().toString()),
  title: "",
  preview: "",
  description: "",
  requirements: "",
  accountantId: "",
  responsibleId: [],
  startDate: "2018-11-13",
  endDate: "2018-11-13",
  tags: [],
};
