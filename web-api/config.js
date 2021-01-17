const dotenv = require('dotenv');
dotenv.config();

const config = {
  server: {
    APPLICATION_PORT: process.env.APPLICATION_PORT,
  },
}

module.exports = config;