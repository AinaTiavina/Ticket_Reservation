import { Sequelize as SequelizeType} from "sequelize/types";
require('dotenv').config();
const { Sequelize } = require('sequelize');
const env = process.env;
let sequelize;

if(process.env.NODE_ENV === "development") {
    sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
        host: env.DB_HOST,
        dialect: env.DB_DIALECT
    });
} else {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        }
      }
    );
}

module.exports = sequelize;