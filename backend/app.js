require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const celebrateErrors = require('celebrate').errors;
const cors = require('cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const notFoundRouter = require('./routes/notFound');
const errors = require('./middlewares/errors');

const { PORT = 3001 } = process.env;
const app = express();

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://camp.nomoredomains.icu',
    'https://camp.nomoredomains.icu',
  ],
};

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use('/', authRouter);
app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);
app.use(notFoundRouter);

app.use(errorLogger);
app.use(celebrateErrors());
app.use(errors);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
