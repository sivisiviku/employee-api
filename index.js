require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

require("./router/index")(app);

app.listen(process.env.PORT || 8081, () => {
  console.log(`Running on port ${process.env.PORT || 8081}`);
});
