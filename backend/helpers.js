function generateError(code = 500, message) {
  const error = new Error(message);
  error.httpStatus = code;
  return error;
}

module.exports = {
  generateError,
};
