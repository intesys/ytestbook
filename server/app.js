const express = require("express");
const cors = require("cors");

const app = express();
const router = express.Router();

require("dotenv").config();
require("./api")(router);

app.use(cors());
app.use("/api", router);

app.listen(process.env.API_WEB_SERVER_PORT || 3000);
console.log("Web Server is listening at port " + (process.env.API_WEB_SERVER_PORT || 3000));

/*

https://github.com/pouchdb-community/pouchdb-replication-stream
https://github.com/pouchdb-community/pouchdb-load

*/
