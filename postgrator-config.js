require('dotenv').config();
const { DB_URL } = require('./src/config')

module.exports = {
  driver: 'pg',
  connectionString: DB_URL
}