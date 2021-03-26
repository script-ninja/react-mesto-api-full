const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина имени пользователя 2 символа'],
    maxlength: [30, 'Максимальная длина имени пользователя 30 символов'],
    required: [true, 'Не указано имя пользователя'],
  },
  about: {
    type: String,
    minlength: [2, 'Минимальная длина описания пользователя 2 символа'],
    maxlength: [30, 'Максимальная длина описания пользователя 30 символов'],
    required: [true, 'Отсутствует информация о пользователе'],
  },
  avatar: {
    type: String,
    required: [true, 'Не указана ссылка на аватар пользователя'],
    validate: {
      validator(url) {
        return /^(https?:\/\/)(www.)?[a-z0-9.-]{1,}\/?[a-z0-9._~:/?%#[\]@!$&'()*+,;=-]{0,}/i.test(url);
      },
      message: 'Некорректный URL аватарки',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
