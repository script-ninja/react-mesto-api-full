function errors(err, req, res, next) {
  const { status = 500, message = 'Ошибка сервера' } = err;
  res.status(status).send({ message });
  next();
}

module.exports = errors;
