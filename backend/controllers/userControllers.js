require("dotenv").config();
const logger = require("npmlog");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateError } = require("../helpers");
const { getConnection } = require("../database/db");
const { registerSchema, loginSchema } = require("../schemas/userSchemas");

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
const login = async (req, res, next) => {
  const conexion = await getConnection();
  try {
    await loginSchema.validateAsync(req.body);
    const { username, password } = req.body;
    const [user] = await conexion.query(
      `select * from users where username = ?`,
      [username]
    );
    if (user.length == 0) throw generateError(409, "No existe ese usuario");

    const encPassword = await bcrypt.compare(password, user[0].password);
    if (!encPassword) throw generateError(403, "La contraseña no coincide");
    await conexion.query(`update users set logged = 1 where username=?`, [
      user[0].username,
    ]);
    const tokenInfo = {
      username: user[0].username,
      role: user[0].role,
      userID: user[0].id,
    };
    const token = jwt.sign(tokenInfo, process.env.SECRETWORD, {
      expiresIn: "30d",
    });
    res.send({ token, username: user[0].username, role: user[0].role });
  } catch (error) {
    logger.error(error);
    next(error);
  } finally {
    if (conexion) conexion.release();
  }
};

const logout = async (req, res, next) => {
  const conexion = await getConnection();
  try {
    const { username } = req.auth;
    await conexion.query(`update users set logged = false where username=?`, [
      username,
    ]);
    logger.info("SERVER", `${username} desconectado`);
    res.send({ message: "Logout" });
  } catch (error) {
    next(error);
  } finally {
    if (conexion) conexion.release();
  }
};

module.exports = {
  register,
  login,
  logout,
};
