const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const ExtendedError = require('../errors/ExtendedError');

const { NODE_ENV } = process.env;
const JWT_KEY = (NODE_ENV === 'production') ? process.env.JWT_KEY : 'jwt-key';

// signin
function login(req, res, next) {
  const { email, password } = req.body;
  UserModel.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) throw new ExtendedError('Неправильные почта или пароль', 401);

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) throw new ExtendedError('Неправильные почта или пароль', 401);
          res.status(200).send({
            token: jwt.sign({ _id: user._id }, JWT_KEY, { expiresIn: '7d' }),
          });
        });
    })
    .catch(next);
}

// signup
function createUser(req, res, next) {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      req.body.password = hash;
      return UserModel.create(req.body);
    })
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch((error) => {
      let status = 500;
      let message = 'Не удалось добавить пользователя';
      switch (error.name) {
        case 'ValidationError':
          status = 400;
          message = error.message;
          break;
        case 'MongoError':
          if (error.code === 11000 && error.keyValue.email === req.body.email) {
            status = 409;
            message = 'Указанный email уже зарегистрирован';
          }
          break;
        default:
          break;
      }
      throw new ExtendedError(message, status);
    })
    .catch(next);
}

module.exports = { login, createUser };
