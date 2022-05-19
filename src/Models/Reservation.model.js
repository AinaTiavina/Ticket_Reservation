const db = require('../Services/database.service');
const { DataTypes } = require('sequelize');
const reservation = db.define('Reservation', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    placeNumber: {
        type: DataTypes.STRING(4),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Place number field should be filled !!!'
            },
            min: {
                args: 1,
                msg: 'The value should be greater or equal to 1 !!'
            },
            max: {
                args: 255,
                msg: 'The value should be less or equal to 255'
            }
        }
    }
}, {
    timestamps: true,
    createdAt: 'reservationDate',           // change createdAt to reservationDate
    updatedAt: false
});

module.exports = reservation;