const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина названия карточки 2 символа'],
    maxlength: [30, 'Максимальная длина названия карточки 30 символов'],
    required: [true, 'Не задано название карточки'],
  },
  link: {
    type: String,
    required: [true, 'Отсутсвует ссылка на картинку карточки'],
    validate: {
      validator(url) {
        return /^(https?:\/\/)(www.)?[a-z0-9.-]{1,}\/?[a-z0-9._~:/?%#[\]@!$&'()*+,;=-]{0,}/i.test(url);
      },
      message: 'Некорректный URL изображения',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Не указан владелец карточки'],
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
