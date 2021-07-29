const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
// const auth = require('../middlewares/auth');
const { validatorCreateUser, validatorLogin } = require('../middlewares/validations');
const { createUser, login } = require('../controllers/users');

const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', validatorCreateUser, createUser);

router.post('/signin', validatorLogin, login);

// router.use(auth);

router.use('/movies', moviesRouter);
router.use('/users', usersRouter);

router.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
