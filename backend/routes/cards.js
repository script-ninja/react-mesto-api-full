const router = require('express').Router();
const {
  getCards, getCard, createCard, deleteCard, toggleLike,
} = require('../controllers/cards');

router.route('/')
  .get(getCards)
  .post(createCard);

router.route('/:id')
  .get(getCard)
  .delete(deleteCard);

router.route('/:id/likes')
  .put(toggleLike)
  .delete(toggleLike);

module.exports = router;
