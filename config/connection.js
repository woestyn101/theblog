// importing sequelize
const Sequelize = require('sequelize');

// Enable access to .env variables
require('dotenv').config();
let sequelize;

// using environmental variables
if (process.env.CLEARDB_DATABASE_URL) {
  sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;
