const fs = require("fs");

module.exports = function (app) {
  fs.readdirSync(__dirname).forEach(function (file) {
    if (file == "index.js") return;
    let name = file.slice(0, file.indexOf("."));
    require("./" + name)(app);
  });
};
