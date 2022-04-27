require("dotenv").config();
const logger = require("npmlog");
const { getConnection } = require("../database/db");

const getNotes = async (req, res, next) => {
    const conexion = await getConnection();
    try {
        const { id } = req.info;
        const [notes] = await conexion.query(
            "select title, description, img, createdAt, categories.name from notes inner join categories on notes.categoryID = categories.id where userID=?",
            [id]
        );
        res.send(notes[0]);
    } catch (error) {
        logger.error(error);
        next(error);
    } finally {
        if (conexion) conexion.release();
    }
};

module.exports = { getNotes };
