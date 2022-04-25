require("dotenv").config();
const jwt = require("jsonwebtoken");
const logger = require("npmlog");
const { getConnection } = require("../database/db");
const { generateError } = require("../helpers");

const isAuth = async (req, res, next) => {
  const conexion = await getConnection();
  try {
    const token = req.headers.authorization;
    if (!token) throw generateError(400, "Falta el token");
    let tokenInfo;
    try {
      tokenInfo = jwt.verify(token, process.env.SECRETWORD);
    } catch (error) {
      throw generateError(401, "El token no es valido");
    }
    const [user] = await conexion.query(
      `select * from users where username="${tokenInfo.username}" and logged = true`
    );
    if (user.length == 0)
      throw generateError(403, "Error de autenticacion, vuelva a logearse");
    req.auth = tokenInfo;
    next();
  } catch (error) {
    logger.error(error);
    next(error);
  } finally {
    if (conexion) conexion.release();
  }
};

module.exports = { isAuth };
