const Movie = require('../models/movie');
const {
  CREATE_CODE, SUCCESS_CODE,
} = require('../utils/erroresConstans');
const BadRequestError = require('../utils/errors/400-BadRequest');
const ForbiddenError = require('../utils/errors/403-Forbidden');
const NotFoundError = require('../utils/errors/404-NotFound');

function getMovies(req, res, next) {
  // console.log('get-movie', req.user._id);
  const owner = req.user._id;
  return Movie
    .find({ owner }).populate(['owner'])
    .then((movie) => {
      console.log('get-movie', movie);
      res.status(SUCCESS_CODE).send(movie);
    })
    .catch(next);
}

function deleteMovie(req, res, next) {
  const { movieId } = req.params;
  const userId = req.user._id;
  // console.log(userId, movieId);
  Movie
    .findById(movieId)
    .orFail(new NotFoundError('Указанного id не существует'))
    .then((movie) => {
      const movieOwner = movie.owner.toString();
      // console.log(movieOwner);
      if (movieOwner === userId) {
        return movie.deleteOne()
          .then(() => res.send({ movie }));
      }
      return next(new ForbiddenError('Можно удалить только свою карточку.'));
    })
    .catch(next);
}

function createMovie(req, res, next) {
  const {
    country, director, duration, year, description, image,
    trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  return Movie
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      owner: req.user._id,
    })
    .then((movie) => res.status(CREATE_CODE).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
}

// function likeCard(req, res, next) {
//   // const { cardId } = req.params;
//   // console.log('likeCard', cardId);
//   Card
//     .findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
//     .orFail(() => new NotFoundError('Указанного id не существует'))
//     .then((card) => { res.status(SUCCESS_CODE).send(card); })
//     // .then((card) => res.status(SUCCESS_CODE).send({ card, message: 'Like was added.' }))
//     .catch(next);
// }

// function dislikeCard(req, res, next) {
//   // const { cardId } = req.params;
//   Card
//     .findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
//     .orFail(() => new NotFoundError('Указанного id не существует'))
//     // .then((card) => { res.status(SUCCESS_CODE).send(card._id); })
//     .then((card) => { res.status(SUCCESS_CODE).send(card); })
//     .catch(next);
// }

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
