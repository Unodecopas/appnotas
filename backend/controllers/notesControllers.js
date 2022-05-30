require("dotenv").config();
const logger = require("npmlog");
const { generateError } = require("../helpers");
const { getConnection } = require("../database/db");

const getNotes = async (req, res, next) => {
  const conexion = await getConnection();
  try {
    const { id } = req.info;
    const [notes] = await conexion.query(
      "select id, title, description, img, categories.name from notes inner join categories on notes.categoryID = categories.id where userID=?",
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

const createNote = async (req, res, next) => {
  const conexion = await getConnection();
  try {
    const { id } = req.info;
    const { title, description, category } = req.body;
    await conexion.query(
      `
              insert into notes (title, description, categoryID, userID)
              values
              (?,?,?,?)
              `,
      [title, description, category, id]
    );
    res.send({ message: "nota creada correctamente" });
  } catch (error) {
    next(error);
  } finally {
    if (conexion) conexion.release();
  }
};

const deleteNote = async (req, res, next) => {
  const conexion = await getConnection();
  try {
    const { noteID } = req.params;
    const { id } = req.info;
    await conexion.query(`delete from notes where id=? and userID=?`, [
      noteID,
      id,
    ]);

    res.send({ message: "Nota borrada" });
    logger.info("deleteNote", "Nota borrada");
  } catch (error) {
    logger.error(error);
    next(error);
  } finally {
    if (conexion) conexion.release();
  }
};

const setPublic = async (req, res, next) => {
  const conexion = await getConnection();
  try {
    const { noteID } = req.params;
    const { userID } = req.auth;
    const [note] = await conexion.query(
      `select * from notes where id =? and userID=?`,
      [noteID, userID]
    );
    if (note.length == 0) throw generateError(404, "Not found");
    if (note[0].public == false) {
      await conexion.query(
        `update notes set public = true where id = ? and userID=?`,
        [noteID, userID]
      );
      logger.info("setPublic", "Nota publica");
      res.send({ message: "La nota ahora es publica" });
    } else {
      await conexion.query(
        `update notes set public = false where id = ? and userID=?`,
        [noteID, userID]
      );
      logger.info("setPublic", "Nota privada");
      res.send({ message: "La nota ahora es privada" });
    }
  } catch (error) {
    logger.error(error);
    next(error);
  } finally {
    if (conexion) conexion.release();
  }
};

module.exports = { getNotes, getNote, createNote, deleteNote, setPublic };
