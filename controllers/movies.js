const Movie = require('../models/movie');

const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

// возвращает все сохранённые пользователем фильмы
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .orFail(() => new NotFoundError('В избранном ничего нет'))
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

// создаёт фильм
module.exports.addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const userId = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: userId,
  })
    .then((movie) => res.status(200).send(movie))
    .catch(next);
};

// удаляет сохранённый фильм по id
module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .orFail(() => new NotFoundError('Фильм не найден'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалять фильмы других пользователей');
      }
      return movie._id;
    })

    .then((id) => Movie.findByIdAndRemove(id)
      .then(() => res.status(200).send({ message: 'Фильм удален' })))
    .catch(next);
};
