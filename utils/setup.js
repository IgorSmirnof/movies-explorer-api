const { config } = require('dotenv');

const {
  PORT = 3000,
  DB_URL_PROD,
  JWT_SECRET = 'very-secret-key',
  NODE_ENV,
} = process.env;

const DB_URL_LOCAL = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const LINKS = [
  'http://localhost:3000',
  'https://smirnov.nomoreparties.co',
  'http://smirnov.nomoreparties.co',
];
// let DB_URL = DB_URL_LOCAL;
let DB_URL = DB_URL_PROD;
if (!(NODE_ENV === 'production')) {
  config();
  DB_URL = DB_URL_LOCAL;
}

module.exports = {
  PORT,
  DB_URL,
  JWT_SECRET,
  NODE_ENV,
  LINKS,
};
