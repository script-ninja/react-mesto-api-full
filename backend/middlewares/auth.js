const jwt = require('jsonwebtoken');
const ExtendedError = require('../errors/ExtendedError');

const { NODE_ENV } = process.env;
const JWT_KEY = NODE_ENV === 'production' ? process.env.JWT_KEY : 'jwt-key';

function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ExtendedError('Необходима авторизация', 401);
  }

  const token = authorization.replace('Bearer ', '');
  try {
    req.user = jwt.verify(token, JWT_KEY);
  } catch (err) {
    throw new ExtendedError('Ошибка авторизации', 401);
  }
  next();
}

module.exports = auth;
