const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const PORT = parseInt(process.env.PORT, 10);

app.use(cors());

const apiRouter = require("./api/apiRouter");
app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
