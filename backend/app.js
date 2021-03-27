const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const notFoundRouter = require('./routes/notFound');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = { _id: '604decf37a58bb3374b65d0f' };
  next();
});
app.use(bodyParser.json());
app.use('/', authRouter);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use(notFoundRouter);

app.use(errors());

app.use((err, req, res, next) => {
  const { message = 'Ошибка сервера', status = 500 } = err;
  res.status(status).send({ message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
