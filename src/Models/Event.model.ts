import { DataTypes, Sequelize } from 'sequelize';
const db: Sequelize = require('../Services/database.service');
import moment from 'moment';

export const event = db.define('Event', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    numEvent: {
        type: DataTypes.VIRTUAL,
        get(){
            return `E_${moment(this.getDataValue('dateEvent')).format('DMMMYYYY')}`;
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
            notEmpty: true,
            isInt: true
        }
    },
    dateEvent: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        get(){
            return moment(this.getDataValue('dateEvent')).format('dddd Do MMMM YYYY');
        }
    },
    imageUrl: {
        type: DataTypes.STRING(80),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    timestamps: false
});