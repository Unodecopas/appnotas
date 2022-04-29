require("dotenv").config();
const logger = require("npmlog");
const { generateError } = require("../helpers");
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

const getNote = async (req, res, next) => {
    const conexion = await getConnection();
    try {
        const { id } = req.info;
        const { noteID } = req.params;
        const [note] = await conexion.query(
            `select title, description, createdAt, img, categories.name from notes inner join categories on notes.categoryID = categories.id where notes.id = ? and userID = ? and public = true `,
            [noteID, id]
        );
        if (note.length == 0) throw generateError(400, "URL invalida");
        res.send(note[0]);
    } catch (error) {
        logger.error("getNote");
        logger.error(error);
        next(error);
    } finally {
        if (conexion) conexion.release();
    }
};

module.exports = { getNotes, getNote };
