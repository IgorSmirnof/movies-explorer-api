const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../../controllers/movies');
// const regexp = require('../../utils/rexp');
const { validateCreateMovie, validateDeleteMovie } = require('../../middlewares/validation');

router.get('/', getMovies);

router.post('/', validateCreateMovie, createMovie);

router.delete('/:movieId', validateDeleteMovie, deleteMovie);

module.exports = router;
