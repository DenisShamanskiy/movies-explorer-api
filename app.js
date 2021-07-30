const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');

const routes = require('./routes');

const customErrorsHandler = require('./middlewares/customErrorsHandler');
const corsOption = require('./middlewares/corsOption');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');

require('dotenv').config();

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

const app = express();

async function connectMongoose() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    // eslint-disable-next-line no-console
    console.log('Связь с MongoDB установлена');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Ошибка подключения к MongoDB', error);
    process.exit(1);
  }
}
connectMongoose();

app.use(helmet());
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(cors(corsOption));

app.use(limiter);

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(customErrorsHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
