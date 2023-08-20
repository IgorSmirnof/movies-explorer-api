const router = require('express').Router();
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { validateCreateUser, validateLogin } = require('../middlewares/validation');

// const URL_REXP = require('../utils/rexp');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const notFoundRoutes = require('./notFound');

router.use('/signup', validateCreateUser, createUser);
router.use('/signin', validateLogin, login);

// router.use('/users', usersRoutes);
// router.use('/movies', moviesRoutes);
router.use('/users', auth, usersRoutes);
router.use('/movies', auth, moviesRoutes);

router.use('/', auth, notFoundRoutes);
// router.use(errors());

module.exports = router;
