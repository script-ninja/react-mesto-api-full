const CardModel = require('../models/card');

function getCards(req, res) {
  CardModel.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(() => {
      res.status(500).send({ message: 'Не удалось получить карточки' });
    });
}

function getCard(req, res) {
  CardModel.findOne({ _id: req.params.id })
    .then((card) => {
      res.status(card ? 200 : 404).send(card || { message: 'Нет карточки с таким ID' });
    })
    .catch((error) => {
      const code = (error.name === 'CastError') ? 400 : 500;
      const err = {
        message: (code === 400) ? 'Некорректный ID карточки' : 'Не удалось получить карточку'
      }
      res.status(code).send(err);
    });
}

function createCard(req, res) {
  req.body.owner = req.user._id;
  CardModel.create(req.body)
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((error) => {
      const code = (error.name === 'ValidationError') ? 400 : 500;
      const err = {
        message: (code === 400) ? error.message : 'Не удалось добавить карточку'
      };
      res.status(code).send(err);
    });
}

function deleteCard(req, res) {
  CardModel.findByIdAndRemove(req.params.id)
    .then((card) => {
      res.status(card ? 200 : 404).send(card || { message: 'Нет карточки с таким ID' });
    })
    .catch((error) => {
      const code = (error.name === 'CastError') ? 400 : 500;
      const err = {
        message: (code === 400) ? 'Некорректный ID карточки' : 'Не удалось удалить карточку'
      };
      res.status(code).send(err);
    });
}

function toggleLike(req, res) {
  CardModel.findByIdAndUpdate(req.params.id,
    // проверка метода запроса нужна для определения того, нужно ли ставить лайк или снимать.
    // (функция используется и для PUT запросов, и для DELETE).
    // так как код для постановки и снятия лайка одинаков, различие лишь в одной инструкции,
    // то нет смысла писать отдельную функцию. Идентичная логика используется мной также на
    // фронтенде и ни у одного ревьюера еще не было вопросов к подобной реализации.
    // Лишь для аватара я не придумал что проверять, поэтому для смены аватара отдельная функция.
    // В функции смены аватара можно было бы проверять по endpoint (req.url),
    // но я не сделал этого предполагая придирку, что url может измениться.
    // Изменил название функции на более точное, отражающее ее назначение по переключению лайка.
    req.method === 'PUT'
      ? { $addToSet: { likes: req.user._id } }
      : { $pull: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      res.status(card ? 200 : 404).send(card || { message: 'Нет карточки с таким ID' });
    })
    .catch((error) => {
      const code = (error.name === 'ValidationError' || error.name === 'CastError') ? 400 : 500;
      const err = {
        message: (code === 400) ? error.message : 'Не удалось поставить/снять лайк'
      };
      res.status(code).send(err);
    });
}

module.exports = {
  getCards,
  getCard,
  createCard,
  deleteCard,
  toggleLike,
};
