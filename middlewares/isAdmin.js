require("dotenv").config();
const jwt = require("jsonwebtoken");
const logger = require("npmlog");
const { getConnection } = require("../database/db");
const { generateError } = require("../helpers");

const isAdmin = async (req, res, next) => {
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
    if (tokenInfo.role != "admin")
      throw generateError(409, "No tienes permisos");

    next();
  } catch (error) {
    logger.error(error);
    next(error);
  } finally {
    if (conexion) conexion.release();
  }
};

module.exports = { isAuth };
