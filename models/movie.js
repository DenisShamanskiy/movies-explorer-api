const mongoose = require("mongoose");
const validator = require("validator");

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле "country" является обязательным'],
  },
  director: {
    type: String,
    required: [true, 'Поле "director" является обязательным'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле "duration" является обязательным'],
  },
  year: {
    type: String,
    required: [true, 'Поле "year" является обязательным'],
  },
  description: {
    type: String,
    required: [true, 'Поле "description" является обязательным'],
  },
  image: {
    type: String,
    required: [true, 'Поле "image" является обязательным'],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: "Введен неверный формат ссылки",
    },
  },
  trailer: {
    type: String,
    required: [true, 'Поле "trailer" является обязательным'],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: "Введен неверный формат ссылки",
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле "thumbnail" является обязательным'],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: "Введен неверный формат ссылки",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Поле "owner" является обязательным'],
    ref: "user",
  },
  movieId: {
    type: Number,
    required: [true, 'Поле "movieId" является обязательным'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле "nameRU" является обязательным'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле "nameEN" является обязательным'],
  },
});

module.exports = mongoose.model("movie", movieSchema);
