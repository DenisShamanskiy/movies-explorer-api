const router = require('express').Router();

const { validatorUpdateUser } = require('../middlewares/validations');

const { getUser, updateUser } = require('../controllers/users');

router.get('/me', getUser);

router.patch('/me', validatorUpdateUser, updateUser);

module.exports = router;
