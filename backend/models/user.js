const mongoose = require('mongoose');
const myValidator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Не указана электронная почта'],
    validate: {
      validator(email) {
        return myValidator.isEmail(email);
      },
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    minlength: [8, 'Минимальная длина пароля 8 символов'],
    required: true,
  },
  name: {
    type: String,
    minlength: [2, 'Минимальная длина имени пользователя 2 символа'],
    maxlength: [30, 'Максимальная длина имени пользователя 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Минимальная длина описания пользователя 2 символа'],
    maxlength: [30, 'Максимальная длина описания пользователя 30 символов'],
    default: 'Исследователь океана',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(url) {
        return /^(https?:\/\/)(www.)?[a-z0-9.-]{1,}\/?[a-z0-9._~:/?%#[\]@!$&'()*+,;=-]{0,}/i.test(url);
      },
      message: 'Некорректный URL аватарки',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
