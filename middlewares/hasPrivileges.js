require("dotenv").config();
const logger = require("npmlog");
const { getConnection } = require("../database/db");
const { generateError } = require("../helpers");

const hasPrivileges = async (req, res, next) => {
    const conexion = await getConnection();
    try {
        const { username, role } = req.auth;
        const userTarget = req.params.username;
        if (username != userTarget && role != "admin")
            throw generateError("403", "No tienes permisos");
        next();
    } catch (error) {
        logger.error(error);
        next(error);
    } finally {
        if (conexion) conexion.release();
    }
};

module.exports = hasPrivileges;
