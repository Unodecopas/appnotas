const Joi = require("Joi");
const { generateError } = require("../helpers");

const registerSchema = Joi.object().keys({
  username: Joi.string()
    .required()
    .min(3)
    .error(
      generateError(400, "Campo USUARIO debe tener al menos 4 caracteres")
    ),
  password: Joi.string()
    .min(4)
    .required()
    .error(
      generateError(400, "Campo CONTRASEÑA debe tener al menos 4 caracteres")
    ),
  email: Joi.string()
    .email()
    .required()
    .error(generateError(400, "Debe introducir un email valido")),
  name: Joi.string()
    .required()
    .min(4)
    .error(generateError(400, "Campo NAME debe tener al menos 4 caracteres")),
  lastname: Joi.string()
    .required()
    .min(4)
    .error(
      generateError(400, "Campo LASTNAME debe tener al menos 4 caracteres")
    ),
});
const loginSchema = Joi.object().keys({
  username: Joi.string()
    .required()
    .min(3)
    .error(generateError(400, "Usuario vacio")),
  password: Joi.string()
    .min(4)
    .required()
    .error(generateError(400, "Contraseña vacia")),
});

module.exports = {
  registerSchema,
  loginSchema,
};
