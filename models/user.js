const mongoose = require('mongoose');
const validator = require('validator');
// const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      minlength: [2, 'Поле должно быть длиной от 2 до 30 символов'],
      maxlength: [30, 'Поле должно быть длиной от 2 до 30 символов'],
      // default: 'Имя',
    },

    email: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      unique: true,
      validate: {
        validator: (data) => validator.isEmail(data),
        message: 'Введите валидный e-mail',
      },
    },

    password: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      select: false,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
