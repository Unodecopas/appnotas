require("dotenv").config();
const logger = require("npmlog");
const bcrypt = require("bcrypt");
const { generateError } = require("../helpers");
const { getConnection } = require("../database/db");
const { registerSchema } = require("../schemas/userSchemas");

const register = async (req, res, next) => {
  const conexion = await getConnection();
  try {
    await registerSchema.validateAsync(req.body);
    const { username, password, email, name, lastname } = req.body;
    const [user] = await conexion.query(
      `select * from users where username=?`,
      [username]
    );
    if (user.length != 0) throw generateError(409, "El usuario ya existe");
    const encPassword = await bcrypt.hash(password, 10);
    const userquery = `insert into users
        (username, password,email, name, lastname, createdAt)
        values(?,?,?,?,?,UTC_TIMESTAMP)`;

    await conexion.query(userquery, [
      username,
      encPassword,
      email,
      name,
      lastname,
    ]);
    logger.info("USERS:", `${username} registrado`);
    res.send({ message: "Creado correctamente" });
  } catch (error) {
    logger.error(error);
    next(error);
  } finally {
    if (conexion) conexion.release();
  }
};

module.exports = {
  register,
};
