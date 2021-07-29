const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validIsURL = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('Ссылка некорректна');
};

const validatorCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validatorLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validatorUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

const validatorMovieBody = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validIsURL),
    trailer: Joi.string().required().custom(validIsURL),
    thumbnail: Joi.string().required().custom(validIsURL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validatorMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  validatorCreateUser, validatorLogin, validatorUpdateUser, validatorMovieBody, validatorMovieId,
};
