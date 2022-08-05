import { Sequelize as SequelizeType} from "sequelize/types";
require('dotenv').config();
const { Sequelize } = require('sequelize');
const env = process.env;

const sequelize: SequelizeType = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
    host: env.DB_HOST,
    dialect: env.DB_DIALECT
});

module.exports = sequelize;