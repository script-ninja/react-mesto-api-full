function errors(err, req, res, next) {
  const { status = 500 } = err;
  const message = (status === 500) ? 'Ошибка сервера' : err.message;
  res.status(status).send({ message });
}

module.exports = errors;