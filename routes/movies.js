const router = require('express').Router();

const { validatorMovieBody, validatorMovieId } = require('../middlewares/validations');

const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', validatorMovieBody, addMovie);

router.delete('/:movieId', validatorMovieId, deleteMovie);

module.exports = router;
