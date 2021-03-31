const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUser, getCurrentUser, updateProfile, updateAvatar,
} = require('../controllers/users');

router.route('/')
  .get(getUsers);

router.route('/me')
  .get(getCurrentUser)
  .patch(celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }), updateProfile);

router.route('/:id')
  .get(celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().length(24).hex(),
    }),
  }), getUser);

router.route('/me/avatar')
  .patch(celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().pattern(new RegExp(/^(https?:\/\/)(www.)?[a-z0-9.-]{1,}\/?[a-z0-9._~:/?%#[\]@!$&'()*+,;=-]{0,}/)),
    }),
  }), updateAvatar);

module.exports = router;
