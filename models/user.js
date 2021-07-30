/* eslint-disable import/no-unresolved */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const NotAuthError = require('../errors/NotAuthError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "Имя" является обязательным'],
    minlength: [2, 'Минимальная длина имени 2 символа'],
    maxlength: [30, 'Максимальная длина имени 30 символов'],
  },
  email: {
    type: String,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Введен неверный формат E-mail',
    },
    required: [true, 'Поле "E-mail" является обязательным'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Поле "Пароль" является обязательным'],
    select: false,
  },
});

userSchema.statics.findUserByEmail = function fn(email, password) {
  return this.findOne({ email })
    .select('+password')
    .orFail(() => new NotAuthError('Передан неверный логин или пароль'))
    .then((user) => bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) throw new NotAuthError('Передан неверный логин или пароль');
      return user;
    }));
};

module.exports = mongoose.model('user', userSchema);
