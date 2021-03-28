const jwt = require('jsonwebtoken');
const ExtendedError = require('../errors/ExtendedError');

function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ExtendedError('Необходима авторизация', 401);
  }

  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, 'secret-key', function(err, payload) {
    if (!payload) throw new ExtendedError('Ошибка авторизации', 401);
    req.user = payload;
  });

  next();
}

module.exports = auth;