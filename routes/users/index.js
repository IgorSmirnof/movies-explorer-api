const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const { validateUpdateUser } = require('../../middlewares/validation');

const {
  updateProfile, getCurrentUser,
} = require('../../controllers/users');
// const URL_REXP = require('../../utils/rexp');

router.get('/me', getCurrentUser);

router.patch('/me', validateUpdateUser, updateProfile);

module.exports = router;
