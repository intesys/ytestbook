const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const db = require("../database/config/db");
const jsonParser = bodyParser.json();

module.exports = function (router) {
  router.get("/testbook", async (req, res) => {
    db.find({
      selector: { type: "testbook" },
    })
      .then(function (response) {
        res.status(200).send(response.docs);
      })
      .catch(function (err) {
        res.status(500).json({ error: error.message });
      });
  });

  router.post("/testbook", jsonParser, async (req, res) => {
    const _id = uuidv4();
    const testbook = {
      _id,
      type: "testbook",
      ...req.body,
    };

    db.put(testbook)
      .then((response) => {
        res.status(201).send(response);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  });
};
