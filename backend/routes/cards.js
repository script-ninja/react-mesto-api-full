const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard, toggleLike,
} = require('../controllers/cards');

router.route('/')
  .get(getCards)
  .post(celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(new RegExp(/^(https?:\/\/)(www.)?[a-z0-9.-]{1,}\/?[a-z0-9._~:/?%#[\]@!$&'()*+,;=-]{0,}/)),
    }),
  }), createCard);

router.route('/:id')
  .delete(celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().length(24).hex(),
    }),
  }), deleteCard);

router.route('/:id/likes')
  .put(celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().length(24).hex(),
    }),
  }), toggleLike)
  .delete(celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().length(24).hex(),
    }),
  }), toggleLike);

module.exports = router;
