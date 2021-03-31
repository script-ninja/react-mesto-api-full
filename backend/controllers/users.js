const UserModel = require('../models/user');

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
        message: (code === 400) ? 'Некорректный ID' : 'Не удалось получить пользователя',
      };
      res.status(code).send(err);
    });
}

function getCurrentUser(req, res) {
  UserModel.findById(req.user._id)
    .then((user) => {
      res.status(user ? 200 : 404).send(user || { message: 'Нет пользователя с таким ID' });
    })
    .catch((error) => {
      const code = (error.name === 'CastError') ? 400 : 500;
      const err = {
        message: (code === 400) ? 'Некорректный ID' : 'Не удалось получить пользователя',
      };
      res.status(code).send(err);
    });
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
        message: (code === 400) ? error.message : 'Не удалось обновить профиль',
      };
      res.status(code).send(err);
    });
}

function updateAvatar(req, res) {
  const { avatar } = req.body;
  UserModel.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true, upsert: true },
  )
    .then((user) => {
      res.status(user ? 200 : 404).send(user || { message: 'Нет пользователя с таким ID' });
    })
    .catch((error) => {
      const code = (error.name === 'ValidationError' || error.name === 'CastError') ? 400 : 500;
      const err = {
        message: (code === 400) ? error.message : 'Не удалось обновить аватар',
      };
      res.status(code).send(err);
    });
}

module.exports = {
  getUsers, getUser, getCurrentUser, updateProfile, updateAvatar,
};
