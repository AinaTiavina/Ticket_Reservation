const { DataTypes } = require('sequelize')
const db = require('../Services/database.service');

const Event = db.define('Event', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    numEvent: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: 10
        }
    },
    title: {
        type: DataTypes.STRING(35),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 35]
        }
    },
    category: {
        type: DataTypes.STRING(25),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 25]
        }
    },
    categoryAge: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
            notEmpty: true,
            isIn: [['Toutes', 'Enfant', 'Jeunesse', 'Adulte']]
        }
    },
    cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            isInt: true
        }
    },
    dateEvent: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
            isDate: true
        }
    }
}, {
    timestamps: false
});

(async () => {
    await Event.sync({force: true});
});

module.exports = Event;