const router = require('express').Router();

const { validatorUpdateUser } = require('../middlewares/validations');

const { getUser, getUsers, updateUser } = require('../controllers/users');

router.get('/me', getUser);

router.patch('/me', validatorUpdateUser, updateUser);

router.get('/', getUsers); // (не используется на фронте)

module.exports = router;
