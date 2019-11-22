require('dotenv').config();
const { DATABASE_URL } = require('./src/config')

module.exports = {
  driver: 'pg',
  connectionString: DATABASE_URL,
  "ssl": !!process.env.SSL
}