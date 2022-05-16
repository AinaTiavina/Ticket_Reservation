const db = require('../Services/database.service');
const { DataTypes } = require('sequelize');

const client = db.define('Client', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codecli: {
        type: DataTypes.STRING(15),
        unique: true,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    FirstName: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(180),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(10),
        unique: true
    },
    cardNumber: {
        type: DataTypes.STRING(16),
        unique: true
    }
});

module.exports = client;