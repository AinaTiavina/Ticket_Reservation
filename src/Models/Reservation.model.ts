const db: Sequelize = require('../Services/database.service');
import { DataTypes, Sequelize } from 'sequelize';
import moment from 'moment';

export const reservation = db.define('Reservation', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    codeReservation: {
        type: DataTypes.VIRTUAL,
        get(){
            return `R${this.getDataValue('placeNumber')}${moment(this.getDataValue('reservationDate')).format('DDMMYYYY')}`
        }
    },
    placeNumber: {
        type: DataTypes.STRING(4),
        allowNull: false,
        validate: {
            notEmpty: true,
            min: {
                args: [1],
                msg: 'The value should be greater or equal to 1 !!'
            },
            max: {
                args: [255],
                msg: 'The value should be less or equal to 255'
            }
        }
    },
    payed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true,
    createdAt: 'reservationDate',           // change createdAt to reservationDate
    updatedAt: false
});