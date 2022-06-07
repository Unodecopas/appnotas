require("dotenv").config();
const logger = require("npmlog");
const { generateError } = require("../helpers");
const { getConnection } = require("../database/db");

const getCategories = async (req, res, next) => {
  const conexion = await getConnection();
  try {
    const [categories] = await conexion.query(`
      select * from categories
    `);
    res.send(categories);
  } catch (error) {
    logger.error(error);
    next(error);
  } finally {
    if (conexion) conexion.release();
  }
};

const createCategory = async (req, res, next) => {
  const conexion = await getConnection();
  try {
    const { name } = req.body;
    const [category] = await conexion.query(
      `select * from categories where name = ?`,
      [name]
    );
    if (name.length != 0) generateError(401, "La categoria ya existe");
    await conexion.query(`insert into categories (name) values (?)`, [name]);
    res.send({ message: `Categoria ${name} creada correctamente` });
  } catch (error) {
    next(error);
  } finally {
    if (conexion) conexion.release();
  }
};
const editCategory = async (req, res, next) => {
  const conexion = await getConnection();
  try {
    const { categoryID } = req.info;
    const { name } = req.body;
    await conexion.query(` update categories set name = ? where id = ?`, [
      name,
      categoryID,
    ]);
    res.send({ message: `Categoria ${categoryID} ahora es ${name}` });
  } catch (error) {
    next(error);
  } finally {
    if (conexion) conexion.release();
  }
};
const deleteCategory = async (req, res, next) => {
  const conexion = await getConnection();
  try {
    const { categoryID } = req.info;
    await conexion.query(` delete from categories where id = ?`, [categoryID]);
    res.send({ message: `categoria ${categoryID} borrada correctamente` });
  } catch (error) {
    next(error);
  } finally {
    if (conexion) conexion.release();
  }
};

module.exports = {
  createCategory,
  editCategory,
  deleteCategory,
  getCategories,
};
