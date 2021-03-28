function errors(err, req, res, next) {
  const { message = 'Ошибка сервера', status = 500 } = err;
  res.status(status).send({ message });
}

module.exports = errors;