const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');
const ExtendedError = require('../errors/ExtendedError');

function getUsers(req, res) {
  UserModel.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(() => {
      res.status(500).send({ message: 'Ошибка получения пользователей' });
    });
}

function getUser(req, res) {
  UserModel.findOne({ _id: req.params.id })
    .then((user) => {
      res.status(user ? 200 : 404).send(user || { message: 'Нет пользователя с таким ID' });
    })
    .catch((error) => {
      const code = (error.name === 'CastError') ? 400 : 500;
      const err = {
        message: (code === 400) ? 'Некорректный ID' : 'Не удалось получить пользователя'
      }
      res.status(code).send(err);
    });
}

function createUser(req, res, next) {
  bcrypt.hash(req.body.password, 10)
  .then((hash) => {
    req.body.password = hash;
    return UserModel.create(req.body);
  })
  .then((user) => {
    res.status(200).send(user);
  })
  .catch((error) => {
    let status = 500;
    let message = 'Не удалось добавить пользователя';
    switch(error.name) {
      case 'ValidationError':
        status = 400;
        message = error.message;
        break;
      case 'MongoError':
        if (error.code === 11000 && error.keyValue.email === req.body.email) {
          status = 400;
          message = 'Указанный email уже зарегистрирован';
        }
        break;
    }
    throw new ExtendedError(message, status);
  })
  .catch(next);
}

function updateProfile(req, res) {
  UserModel.findByIdAndUpdate(
    req.user._id,
    req.body,
    { new: true, runValidators: true, upsert: true },
  )
    .then((user) => {
      res.status(user ? 200 : 404).send(user || { message: 'Нет пользователя с таким ID' });
    })
    .catch((error) => {
      const code = (error.name === 'ValidationError' || error.name === 'CastError') ? 400 : 500;
      const err = {
        message: (code === 400) ? error.message : 'Не удалось обновить профиль'
      };
      res.status(code).send(err);
    });
}

function updateAvatar(req, res) {
  const { avatar } = req.body;
  UserModel.findByIdAndUpdate(
    req.user._id,
    { avatar: avatar },
    { new: true, runValidators: true, upsert: true },
  )
    .then((user) => {
      res.status(user ? 200 : 404).send(user || { message: 'Нет пользователя с таким ID' });
    })
    .catch((error) => {
      const code = (error.name === 'ValidationError' || error.name === 'CastError') ? 400 : 500;
      const err = {
        message: (code === 400) ? error.message : 'Не удалось обновить аватар'
      };
      res.status(code).send(err);
    });
}

module.exports = {
  getUsers, getUser, createUser, updateProfile, updateAvatar,
};
