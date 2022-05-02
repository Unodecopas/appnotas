require("dotenv").config();
const logger = require("npmlog");
const { generateError } = require("../helpers");
const { getConnection } = require("../database/db");

const categoryExists = async (req, res, next) => {
  const conexion = await getConnection();
  try {
    const { name } = req.params;
    const [category] = await conexion.query(
      `select * from categories where name =?`,
      [name]
    );
    if (category.length == 0)
      throw generateError(404, `La categoria ${name} no existe`);
    req.info = { categoryID: category[0].id };
    next();
  } catch (error) {
    next(error);
  } finally {
    if (conexion) conexion.release();
  }
};

module.exports = { categoryExists };
