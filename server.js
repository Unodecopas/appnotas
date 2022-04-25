require("dotenv").config();
const express = require("express");
const app = express();
const logger = require("npmlog");
const morgan = require("morgan");
const { register, login, logout } = require("./controllers/userControllers");
const { isAuth } = require("./middlewares/isAuth");
// middlewares
app.use(morgan("dev"));
app.use(express.json());

// routes
app.post("/register", register);
app.post("/login", login);
app.patch("/logout", isAuth, logout);

//errors 404
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not found",
  });
});

//middleware errors
app.use((error, req, res, next) => {
  res.status(error.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
});

// server listening
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  logger.info("SERVER", `http://localhost:${PORT}`);
});
