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
        unique: true,
        validate: {
            notEmpty: {
                args: true,
                msg: 'This field cannot be empty'
            },
            len: 10
        }
    },
    title: {
        type: DataTypes.STRING(35),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'This field cannot be empty'
            },
            len: [2, 35]
        }
    },
    category: {
        type: DataTypes.STRING(25),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'This field cannot be empty'
            },
            len: [3, 25]
        }
    },
    categoryAge: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'This field cannot be empty'
            },
            isIn: {
                args: [['Toutes', 'Enfant', 'Adolescent', 'Adulte']],
                msg: 'The value should be one of this (Toutes, Enfant, Adolescent, Adulte)', 
            }
        }
    },
    cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'This field cannot be empty'
            },
            isInt: true
        }
    },
    dateEvent: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'This field cannot be empty'
            },
            isDate: true
        }
    },
    imageUrl: {
        type: DataTypes.STRING(80),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'This field cannot be empty'
            },
        }
    }
}, {
    timestamps: false
});

module.exports = Event;