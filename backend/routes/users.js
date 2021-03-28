const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUser, getCurrentUser, updateProfile, updateAvatar,
} = require('../controllers/users');

router.route('/')
  .get(getUsers);

// router.route('/:id')
// .get(celebrate({
//   params: Joi.object().keys({
//     id: Joi.string().alphanum().length(24),
//   }),
// }), getUser);

router.route('/me')
  .get(getCurrentUser)
  .patch(celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string(),
    }),
  }), updateProfile);

router.route('/me/avatar')
  .patch(celebrate({
    body: Joi.object().keys({
      avatar: Joi.string(),
    }),
  }), updateAvatar);

module.exports = router;
