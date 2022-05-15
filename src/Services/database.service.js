const { Sequelize } = require('sequelize');
const env = process.env;

const sequelize = new Sequelize('Reservation_Cinema', 'root', 'root', {
    host: 'localhost',
    dialect: 'mariadb'
});

module.exports = sequelize;