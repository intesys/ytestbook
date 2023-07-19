const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const db = require("../database/config/db");
const jsonParser = bodyParser.json();

module.exports = function (router) {
  router.get("/testcase", async (req, res) => {
    db.find({
      selector: { type: "testcase" },
    })
      .then(function (response) {
        res.status(200).send(response.docs);
      })
      .catch(function (err) {
        res.status(500).json({ error: error.message });
      });
  });

  router.post("/testcase", jsonParser, async (req, res) => {
    const _id = uuidv4();
    const testcase = {
      _id,
      type: "testcase",
      ...req.body,
    };

    db.put(testcase)
      .then((response) => {
        res.status(201).send(response);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  });
};
