require("dotenv").config();
const logger = require("npmlog");
const { getConnection } = require("../database/db");
const { generateError } = require("../helpers");

const userExist = async (req, res, next) => {
    const conexion = await getConnection();
    try {
        const username = req.params.username;
        const [user] = await conexion.query(
            `select * from users where username = ?`,
            [username]
        );
        if (user.length == 0) throw generateError(400, "El usuario no existe");
        req.info = { id: user[0].id };
        next();
    } catch (error) {
        logger.error(error);
        next(error);
    } finally {
        if (conexion) conexion.release();
    }
};

module.exports = userExist;
