require('dotenv').config();

module.exports = {
  driver: 'pg',
  connectionString: process.env.DB_URL
}