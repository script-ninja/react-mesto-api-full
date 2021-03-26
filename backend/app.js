const { PORT = 3000 } = process.env;
const express = require('express');

const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const notFoundRouter = require('./routes/notFound');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use((req, res, next) => {
  req.user = { _id: '604decf37a58bb3374b65d0f' };
  next();
});
app.use(bodyParser.json());
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use(notFoundRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
