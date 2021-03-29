const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('../controllers/auth');

router.route('/signin')
  .post(celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email().messages({
        'any.required': 'Email обязательное поле',
        'string.email': 'Невалидный email-адрес',
        'string.empty': 'Не указан email'
      }),
      password: Joi.string().required().min(2).max(30).messages({
        'any.required': 'Пароль обязательное поле',
        'string.min': 'Минимум 2 символа в пароле',
        'string.max': 'Максимум 30 символов в пароле',
        'string.empty': 'Не указан пароль'
      }),
    }),
  }), login);

router.route('/signup')
  .post(celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email().messages({
        'any.required': 'Email обязательное поле',
        'string.email': 'Невалидный email-адрес',
        'string.empty': 'Не указан email'
      }),
      password: Joi.string().required().min(2).max(30).messages({
        'any.required': 'Пароль обязательное поле',
        'string.min': 'Минимум 2 символа в пароле',
        'string.max': 'Максимум 30 символов в пароле',
        'string.empty': 'Не указан пароль'
      }),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string(),
    }),
  }), createUser);

module.exports = router;