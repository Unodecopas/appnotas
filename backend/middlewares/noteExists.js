require("dotenv").config();
const logger = require("npmlog");
const { getConnection } = require("../database/db");
const { generateError } = require("../helpers");

const noteExist = async (req, res, next) => {
    const conexion = await getConnection();
    try {
        const { noteID } = req.params;
        const { id } = req.info;
        const [note] = await conexion.query(
            `select * from notes where id = ? and userID = ?`,
            [noteID, id]
        );
        if (note.length == 0) throw generateError(400, "La nota no existe");
        next();
    } catch (error) {
        logger.error(error);
        next(error);
    } finally {
        if (conexion) conexion.release();
    }
};

module.exports = noteExist;
