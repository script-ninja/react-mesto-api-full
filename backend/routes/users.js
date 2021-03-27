const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUser, createUser, updateProfile, updateAvatar,
} = require('../controllers/users');

router.route('/')
  .get(getUsers)
  .post(celebrate({
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required().min(8).max(30),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string(),
    }),
  }), createUser);

router.route('/:id')
  .get(getUser);

router.route('/me')
  .patch(updateProfile);

router.route('/me/avatar')
  .patch(updateAvatar);

module.exports = router;
