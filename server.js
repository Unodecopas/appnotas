require("dotenv").config();
const express = require("express");
const app = express();
const logger = require("npmlog");
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(express.json());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  logger.info("SERVER", `http://localhost:${PORT}`);
});
