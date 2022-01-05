require('dotenv').config();

const { PORT = 3000 } = process.env;

const MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb';

module.exports = {
  PORT,
  MONGO_URL,
};
