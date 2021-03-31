const router = require('express').Router();
const ExtendedError = require('../errors/ExtendedError');

router.use(() => {
  throw new ExtendedError('Запрашиваемый ресурс не найден', 404);
});

module.exports = router;
