const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const PORT = parseInt(process.env.PORT, 10);

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const apiRouter = require("./api/apiRouter");
app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
