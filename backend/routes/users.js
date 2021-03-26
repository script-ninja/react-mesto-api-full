const router = require('express').Router();
const {
  getUsers, getUser, createUser, updateProfile, updateAvatar,
} = require('../controllers/users');

router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .get(getUser);

router.route('/me')
  .patch(updateProfile);

router.route('/me/avatar')
  .patch(updateAvatar);

module.exports = router;
